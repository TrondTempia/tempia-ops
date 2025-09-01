// Figma export sync script (Node 18+)
// Laster ned eksporterte bilder fra Figma og skriver dem til repoet.
// Konfigurer regler i figma.config.json
import { promises as fs } from "node:fs";
import path from "node:path";

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!FIGMA_TOKEN) {
  console.error("FIGMA_TOKEN mangler (sett som repo secret).");
  process.exit(1);
}

async function readConfig() {
  const defaultConfig = {
    fileKey: FIGMA_FILE_KEY || "",
    includePages: [],
    excludePages: [],
    export: [
      {
        name: "components-as-svg",
        match: ["^.*$"],
        types: ["COMPONENT", "COMPONENT_SET"],
        format: "svg",
        scale: 1,
        output: "assets/figma/components"
      }
    ]
  };

  try {
    const raw = await fs.readFile("figma.config.json", "utf8");
    const cfg = JSON.parse(raw);
    return { ...defaultConfig, ...cfg, export: cfg.export || defaultConfig.export };
  } catch {
    return defaultConfig;
  }
}

function compileRegex(list) {
  return (list || []).map((p) => new RegExp(p));
}

function matchAny(str, regexes) {
  if (!regexes || regexes.length === 0) return true;
  return regexes.some((r) => r.test(str));
}

function matchNone(str, regexes) {
  if (!regexes || regexes.length === 0) return true;
  return !regexes.some((r) => r.test(str));
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function bufferEqual(a, b) {
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  return a.equals(b);
}

async function fetchJson(url, headers = {}) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}\n${text}`);
  }
  return res.json();
}

async function fetchBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status} ${res.statusText}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

async function getFileTree(fileKey) {
  const url = `https://api.figma.com/v1/files/${fileKey}`;
  return fetchJson(url, { "X-Figma-Token": FIGMA_TOKEN });
}

function walkNodes(node, currentPath = [], out = []) {
  const pathNow = [...currentPath, node.name].filter(Boolean);
  const fullPath = pathNow.join("/");
  out.push({ id: node.id, name: node.name || "", type: node.type, path: fullPath, node });

  const children = node.children || [];
  for (const c of children) {
    walkNodes(c, pathNow, out);
  }
  return out;
}

function filterNodes(nodes, includePagesRe, excludePagesRe) {
  // Filtrer etter side (første segment i path)
  return nodes.filter((n) => {
    const pageName = (n.path || "").split("/")[0] || "";
    return matchAny(pageName, includePagesRe) && matchNone(pageName, excludePagesRe);
  });
}

function groupByExportRules(nodes, rules) {
  const groups = [];
  for (const rule of rules) {
    const nameRes = compileRegex(rule.match || ["^.*$"]);
    const allowedTypes = rule.types || [];
    const matched = nodes.filter((n) => {
      const target = `${n.path}`;
      const okType = allowedTypes.length ? allowedTypes.includes(n.type) : true;
      return okType && matchAny(target, nameRes);
    });
    if (matched.length > 0) {
      groups.push({ rule, nodes: matched });
    }
  }
  return groups;
}

async function exportImages(fileKey, ids, format, scale) {
  // Figma Images API gir short-lived URLs
  const base = `https://api.figma.com/v1/images/${fileKey}`;
  const search = new URLSearchParams({
    ids: ids.join(","),
    format,
    scale: String(scale || 1)
  });
  const url = `${base}?${search.toString()}`;
  const json = await fetchJson(url, { "X-Figma-Token": FIGMA_TOKEN });
  return json.images || {};
}

async function run() {
  const cfg = await readConfig();
  const fileKey = cfg.fileKey || FIGMA_FILE_KEY;
  if (!fileKey) {
    console.error("FIGMA_FILE_KEY mangler (sett i figma.config.json eller som secret).");
    process.exit(1);
  }

  console.log(`Henter Figma-fil: ${fileKey}`);
  const file = await getFileTree(fileKey);
  const document = file.document;
  if (!document) throw new Error("Ugyldig Figma-respons: mangler document");

  const all = walkNodes(document);
  const includePagesRe = compileRegex(cfg.includePages || []);
  const excludePagesRe = compileRegex(cfg.excludePages || []);
  const candidates = filterNodes(all, includePagesRe, excludePagesRe);

  const groups = groupByExportRules(candidates, cfg.export || []);

  // Ekstra logging for å sikre treff
  console.log(`Kandidater totalt etter sidefiltre: ${candidates.length}`);
  if (groups.length === 0) {
    console.log("Ingen regler ga treff. Sjekk match/typer/output i figma.config.json.");
  } else {
    console.log("Regeloppsummering:");
    for (const { rule, nodes } of groups) {
      const fmt = (rule.format || "svg").toLowerCase();
      const out = rule.output || `assets/figma/${slugify(rule.name || "export")}`;
      const scale = rule.scale || 1;
      console.log(` - ${rule.name || "unnamed"}: ${nodes.length} treff -> ${out} (format=${fmt}, scale=${scale})`);
    }
  }

  let totalDownloads = 0;
  let totalWritten = 0;

  for (const { rule, nodes } of groups) {
    const format = (rule.format || "svg").toLowerCase();
    const scale = rule.scale || 1;
    const outputBase = rule.output || `assets/figma/${slugify(rule.name || "export")}`;
    await ensureDir(outputBase);

    const batchSize = 80; // unngå for store kall
    for (let i = 0; i < nodes.length; i += batchSize) {
      const batch = nodes.slice(i, i + batchSize);
      const ids = batch.map((n) => n.id);
      const urlMap = await exportImages(fileKey, ids, format, scale);

      for (const n of batch) {
        const url = urlMap[n.id];
        if (!url) continue;

        totalDownloads++;
        try {
          const buf = await fetchBuffer(url);
          const baseName = slugify(n.name || "node");
          const ext = format === "png" ? "png" : "svg";
          const filePath = path.join(outputBase, `${baseName}-${n.id.slice(0, 6)}.${ext}`);

          let wrote = false;
          try {
            const existing = await fs.readFile(filePath);
            if (!(await bufferEqual(existing, buf))) {
              await fs.writeFile(filePath, buf);
              wrote = true;
            }
          } catch {
            await fs.writeFile(filePath, buf);
            wrote = true;
          }
          if (wrote) {
            totalWritten++;
            console.log(`↻ Oppdatert: ${filePath}`);
          } else {
            console.log(`✓ Uendret: ${filePath}`);
          }
        } catch (e) {
          console.warn(`Feil ved nedlasting/skriving for ${n.path}: ${e.message}`);
        }
      }
    }
  }

  console.log(`Ferdig. Nedlastet: ${totalDownloads}, skrevet/oppdatert: ${totalWritten}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

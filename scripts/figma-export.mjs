// Figma export sync script (Node 18+)
// Laster ned eksporterte bilder fra Figma og skriver dem til repoet.
// Konfigurer regler i figma.config.json
import { promises as fs } from "node:fs";
import path from "node:path";

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!FIGMA_TOKEN) {
  console.error("FIGMA_TOKEN mangler (sett som repo secret).\nSe repo Settings → Secrets and variables → Actions → FIGMA_TOKEN");
  process.exit(1);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (const a of args) {
    const m = a.match(/^--?([^=]+)=(.*)$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

async function readJsonIfExists(p) {
  try {
    const raw = await fs.readFile(p, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
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

  // Prøv rotkonfig først, deretter fallback til figma.config/new-config.json
  const rootCfg = await readJsonIfExists("figma.config.json");
  if (rootCfg) {
    return { ...defaultConfig, ...rootCfg, export: rootCfg.export || defaultConfig.export };
  }
  const altCfg = await readJsonIfExists("figma.config/new-config.json");
  if (altCfg) {
    return { ...defaultConfig, ...altCfg, export: altCfg.export || defaultConfig.export };
  }
  return defaultConfig;
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
  try {
    return await fetchJson(url, { "X-Figma-Token": FIGMA_TOKEN });
  } catch (e) {
    const msg = String(e && e.message ? e.message : e);
    if (msg.includes("File type not supported by this endpoint")) {
      throw new Error(
        "Figma svarte: 'File type not supported by this endpoint'.\n" +
          "Dette tyder ofte på at fileKey peker til en FigJam/whiteboard. 'v1/files' støtter kun Design-filer.\n" +
          "Åpne design-filen i Figma og kopier nøkkelen etter /file/ i URL-en."
      );
    }
    if (msg.includes("HTTP 403") || msg.toLowerCase().includes("forbidden")) {
      throw new Error(
        "Figma svarte 403 Forbidden. Sjekk at FIGMA_TOKEN har gyldig tilgang til filen, " +
          "og at du eventuelt er innlogget/har blitt delt inn i filens team."
      );
    }
    if (msg.includes("HTTP 404")) {
      throw new Error(
        "Figma svarte 404 Not Found. Kontroller at fileKey er korrekt (kopiert fra riktig Design-fil)."
      );
    }
    throw e;
  }
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
  const args = parseArgs();
  const cfg = await readConfig();

  const argKey = args.fileKey || args["file-key"] || "";
  let fileKey = argKey || FIGMA_FILE_KEY || cfg.fileKey;
  let fileKeySource = argKey ? "cli" : FIGMA_FILE_KEY ? "env" : cfg.fileKey ? "config" : "";

  if (!fileKey) {
    console.error(
      "FIGMA_FILE_KEY mangler. Oppgi en av følgende:\n" +
        " - Sett env/secret FIGMA_FILE_KEY, eller\n" +
        " - Legg 'fileKey' i figma.config.json (eller figma.config/new-config.json), eller\n" +
        " - Kjør med CLI: node scripts/figma-export.mjs --fileKey=YOUR_KEY\n"
    );
    process.exit(1);
  }

  console.log(`Bruker fileKey fra: ${fileKeySource}`);
  console.log(`Henter Figma-fil: ${fileKey}`);

  const file = await getFileTree(fileKey);
  const document = file.document;
  if (!document) throw new Error("Ugyldig Figma-respons: mangler document");

  const all = walkNodes(document);
  const includePagesRe = compileRegex(cfg.includePages || []);
  const excludePagesRe = compileRegex(cfg.excludePages || []);
  const candidates = filterNodes(all, includePagesRe, excludePagesRe);

  const groups = groupByExportRules(candidates, (cfg.export || []));

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

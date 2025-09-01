import fs from 'fs';

const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID;
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;

export async function fetchFigmaTokens(): Promise<Record<string, string>> {
  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_ID}`;
  const response = await fetch(url, {
    headers: {
      'X-Figma-Token': FIGMA_ACCESS_TOKEN
    }
  });
  const figmaData = await response.json();

  // Tilpass parsing til din Figma-fil. Eksempel for farger:
  const tokens: Record<string, string> = {};
  for (const styleId in figmaData.styles) {
    const style = figmaData.styles[styleId];
    if (style.style_type === 'FILL') {
      tokens[`--color-${style.name.replace(/\s+/g, '-').toLowerCase()}`] = style.description || '#000000';
    }
  }
  // Legg til mer parsing etter behov (radius, typografi osv.)
  return tokens;
}

export async function writeTokensCss(tokens: Record<string, string>, outFile: string) {
  let css = '/**\n * Tempia Design Tokens\n * Auto-generated from Figma - Do not edit directly\n */\n\n:root {\n';
  for (const [key, value] of Object.entries(tokens)) {
    css += `  ${key}: ${value};\n`;
  }
  css += '}\n';
  fs.writeFileSync(outFile, css, 'utf8');
}

// Kjør alt
(async () => {
  const tokens = await fetchFigmaTokens();
  await writeTokensCss(tokens, 'styles/tokens.css');
})();

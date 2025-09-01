const fetch = require('node-fetch');
const fs = require('fs');
const { execSync } = require('child_process');

const FIGMA_API_TOKEN = 'YOUR_FIGMA_API_TOKEN';
const FILE_KEY = 'YOUR_FIGMA_FILE_KEY';
const GITHUB_REPO_PATH = './path/to/your/repo';

async function fetchFigmaFile() {
  const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}`, {
    headers: { 'X-Figma-Token': FIGMA_API_TOKEN }
  });
  return res.json();
}

async function main() {
  const figmaData = await fetchFigmaFile();
  fs.writeFileSync(`${GITHUB_REPO_PATH}/figma-export.json`, JSON.stringify(figmaData, null, 2));
  execSync(`cd ${GITHUB_REPO_PATH} && git add . && git commit -m "Update Figma export" && git push`);
}

main();

# Formål
- Denne mappen inneholder alternative konfigurasjoner for Figma-eksport.

## Slik bruker du
1) Finn riktig fileKey fra Figma Design-filen (ikke FigJam):
   - Åpne filen i Figma og kopier delen etter /file/ i URL-en.
     Eksempel: https://www.figma.com/file/FILE_KEY/... → FILE_KEY
2) Åpne new-config.json og verifiser/oppdater feltet fileKey dersom nødvendig.
3) Kopier ønsket konfig til rot som figma.config.json (skriptet leser kun rotfilen i dagens oppsett):
   - cp figma.config/new-config.json figma.config.json
4) Kjør workflowen "Figma Export Sync" på GitHub, eller lokalt:
   - FIGMA_TOKEN=... node scripts/figma-export.mjs

## Tips
- Feilen "File type not supported by this endpoint" betyr vanligvis at fileKey peker på en FigJam/whiteboard og ikke en Design-fil.
- Alternativt kan du sette secrets/variables i repoet:
  - FIGMA_TOKEN: Personal Access Token fra Figma
  - FIGMA_FILE_KEY: Overstyrer fileKey i config ved kjøring i CI
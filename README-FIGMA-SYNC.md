# Figma → GitHub sync (CI)

Automatisk eksport av assets fra en Figma-fil til repoet.

## Forutsetninger
- Repo-secrets:
  - `FIGMA_TOKEN` – Figma Personal Access Token med filtilgang.
  - `FIGMA_FILE_KEY` – iWOdfts5H17fHjAzfXiK5D

## Kjøring
- Actions → "Figma Export Sync" → Run workflow (manuelt), eller vent på cron (hver time).
- Filer blir skrevet til `assets/figma/...` og committed automatisk.

## Konfigurasjon
- `figma.config.json` styrer hvilke noder som eksporteres, format (svg/png), skala og utmappe.

# Tempia Operations Dashboard

Et produksjonsklart Next.js 14 dashboard for nødsituasjonsoperasjoner med skandinavisk designestetikk og automatisk Figma token-synkronisering.

## 🚀 Quick Start

```bash
# Installer avhengigheter
npm install

# Start utviklingsserver
npm run dev

# Bygg for produksjon
npm run build

# Start produksjonsserver
npm start
```

Åpne [http://localhost:3000](http://localhost:3000) i nettleseren.

## 🎨 Design System

Prosjektet bruker Tempia Design System med:
- **Automatisk Figma synkronisering** via GitHub Actions
- **Strukturerte design tokens** (base → semantic → component)
- **Skandinavisk designidentitet** med industriell estetikk
- **Responsivt design** for desktop og mobil

### Keyboard Shortcuts
- `Ctrl/Cmd + B` - Toggle Brand Guide (design dokumentasjon)

## 📁 Prosjektstruktur

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Tailwind + design tokens
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Hovedside
├── src/
│   ├── components/        # React komponenter
│   │   ├── Tempia/       # Custom designsystem komponenter
│   │   └── ui/           # Shadcn/ui komponenter
│   ├── lib/              # Utilities
│   └── styles/           # Design tokens og synkronisering
├── docs/                 # Dokumentasjon
└── .github/workflows/    # GitHub Actions for token-sync
```

## 🔧 Design Token Workflow

1. **Endre tokens i Figma** → Design Variables/Styles
2. **GitHub Actions** → Automatisk synkronisering hver 6. time
3. **CSS tokens oppdateres** → `/src/styles/tokens.css`
4. **Vercel deployment** → Automatisk rebuild og deploy

### Manuell token-synkronisering
```bash
npm run sync-tokens
```

## 🎯 Komponenter

### Tempia Design System
- `Button` - Primær, sekundær, tertiær, destruktiv
- `Card` - Konsistente kort med valgfri tittel
- `Badge` - Status-badges med subtle/solid stiler
- `NavItem` - Navigasjonselementer med ikoner
- `ChartPlaceholder` - Placeholders for diagrammer

### Brukseksempel
```tsx
import { Button } from '@/components/Tempia/Button';
import { Card } from '@/components/Tempia/Card';

<Card title="Aktive Prosedyrer">
  <Button variant="primary" size="lg">
    Se detaljer
  </Button>
</Card>
```

## 🌙 Tema Support

Systemet støtter automatisk lys/mørk tema via CSS custom properties:

```css
/* Lys tema (standard) */
:root {
  --color-bg-page: var(--color-slate-50);
  --color-text-primary: var(--color-slate-900);
}

/* Mørkt tema */
.dark {
  --color-bg-page: var(--color-slate-900);
  --color-text-primary: var(--color-slate-50);
}
```

## 📦 Deployment

### Vercel (Anbefalt)
```bash
# Koble til Vercel
npx vercel

# Sett miljøvariabler for Figma-synkronisering
# FIGMA_ACCESS_TOKEN=xxx
# FIGMA_FILE_ID=xxx
```

### Andre platformer
Prosjektet bruker standard Next.js 14 og kan deployes hvor som helst som støtter Node.js.

## 🔐 Miljøvariabler

For Figma token-synkronisering:
```env
FIGMA_ACCESS_TOKEN=your_figma_token
FIGMA_FILE_ID=your_figma_file_id
```

## 🛠 Utvikling

### Legg til ny komponent
1. Opprett komponent i `/src/components/Tempia/`
2. Definer component tokens i `/src/styles/tokens.css`
3. Bruk semantiske tokens, ikke rå hex-verdier
4. Test i Brand Guide (`Ctrl/Cmd + B`)

### Token-retningslinjer
```tsx
// ❌ Ikke gjør dette
<div style={{ color: '#111827' }}>

// ✅ Gjør dette
<div style={{ color: 'var(--color-brand-primary)' }}>
```

## 📚 Ressurser

- [Figma Token Sync Guide](/docs/figma-token-sync.md)
- [Design Guidelines](/guidelines/Guidelines.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

## 🤝 Bidrag

1. Fork prosjektet
2. Opprett feature branch (`git checkout -b feature/amazing-feature`)
3. Commit endringer (`git commit -m 'Add amazing feature'`)
4. Push til branch (`git push origin feature/amazing-feature`)
5. Åpne Pull Request

## 📄 Lisens

Privat prosjekt - Tempia © 2025
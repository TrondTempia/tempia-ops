# Tempia Ops - Emergency Operations Dashboard

Fullstendig Vite/React/TypeScript applikasjon for nødsituasjonsoperasjoner med skandinavisk design. Bygget med Supabase backend for autentisering, database og file storage.

## 🛠 Teknologistack

- **Byggverktøy**: Vite + TypeScript
- **Frontend**: React 18, Tailwind CSS
- **Routing**: react-router-dom v6
- **Backend**: Supabase (Auth, Database, Storage)
- **Flytskjema**: React Flow
- **Ikoner**: Lucide React
- **Code Quality**: ESLint + Prettier

## 🚀 Lokalt oppsett

### 1. Installer dependencies
```bash
npm install
```

### 2. Sett opp miljøvariabler
Opprett `.env.local` fil i rot-mappen:
```env
VITE_SUPABASE_URL=https://din-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=din-anon-key
```

### 3. Sett opp Supabase database
1. Gå til [Supabase Dashboard](https://supabase.com/dashboard)
2. Opprett nytt prosjekt eller bruk eksisterende
3. Gå til SQL Editor og kjør migrasjonene:

```sql
-- Kjør innholdet fra supabase/migrations/0001_init.sql
-- Deretter kjør innholdet fra supabase/migrations/0002_storage.sql
```

### 4. Opprett brukere i Supabase
I Supabase Authentication > Users, opprett brukere og sett app_metadata:

**For administrator:**
```json
{
  "role": "admin"
}
```

**For viewer (f.eks. Kiwa):**
```json
{
  "role": "viewer"
}
```

### 5. Start utviklingsserver
```bash
npm run dev
```

Applikasjonen kjører på `http://localhost:5173`

## 📦 Bygging for produksjon

```bash
npm run build
```

Output havner i `build/` mappen (konfigurert for Vercel).

## 🌐 Vercel deployment

### 1. Environment Variables
I Vercel Project Settings → Environment Variables, legg til:
- `VITE_SUPABASE_URL`: Din Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Din Supabase anon/public key

### 2. Build Settings
- **Framework Preset**: Vite
- **Output Directory**: `build`
- **Install Command**: `npm install`
- **Build Command**: `npm run build`

### 3. Deploy
```bash
# Via Vercel CLI
npm i -g vercel
vercel

# Eller koble GitHub repo til Vercel dashboard
```

## 🏗 Prosjektstruktur

```
/
├── src/
│   ├── lib/
│   │   ├── supabaseClient.ts     # Supabase konfigurasjon
│   │   └── auth.ts               # Auth hjelpefunksjoner
│   ├── pages/
│   │   ├── LoginPage.tsx         # Innlogging
│   │   ├── BuildingsList.tsx     # Byggoversikt
│   │   ├── BuildingDetail.tsx    # Byggdetaljer
│   │   ├── ProceduresPage.tsx    # Prosedyreadministrasjon
│   │   ├── FlowViewer.tsx        # Vis prosessflyt
│   │   └── FlowEditor.tsx        # Rediger prosessflyt (admin)
│   ├── components/
│   │   ├── Header.tsx            # Navigasjon
│   │   ├── ProtectedRoute.tsx    # Auth guard
│   │   └── FdvUploadList.tsx     # PDF opplasting
│   └── styles/
│       └── tokens.css            # Design tokens
├── supabase/migrations/          # Database migrasjoner
├── vite.config.ts               # Vite konfigurasjon
└── package.json
```

## 📋 Hovedfunksjoner

### 🔐 Autentisering
- E-post + passord via Supabase Auth
- Rollebasert tilgang (admin/viewer)
- Beskyttede ruter

### 🏢 Byggadministrasjon
- Liste over bygg (nummer 40-130)
- Detaljside per bygg
- Redigering av bygginformasjon (kun admin)

### 📄 FDV Dokumenter
- PDF opplasting til Supabase Storage (kun admin)
- Sikre signerte URL'er (1 time utløp)
- Filhåndtering og nedlasting

### 📋 Prosedyrer
- CRUD operasjoner for prosedyrer (kun admin)
- Eksterne lenker til dokumenter
- Integrert med prosessflyt

### 🔄 Prosessflyt
- **Viewer**: Interaktiv visning av prosessflyt
- **Editor**: Dra-og-slipp redigering (kun admin)
- React Flow integrert med Supabase
- Klikk på noder åpner tilhørende prosedyrer

## 🔒 Sikkerhet og tilgangskontroll

### Row Level Security (RLS)
Alle tabeller har RLS aktivert med policies basert på `jwt_role()` funksjon.

### Roller
- **admin**: Full CRUD tilgang til alt innhold
- **viewer**: Kun lesetilgang (f.eks. for Kiwa)

### Storage Security
- FDV bucket er privat
- Kun admin kan laste opp/slette filer
- Viewer får tilgang via signerte URL'er

## 🗄 Database schema

### Tabeller
- `buildings`: Bygginformasjon (nummer, navn, adresse)
- `procedures`: Prosedyrer med eksterne lenker
- `fdv_files`: Metadata for PDF filer i Storage
- `flows`: Prosessflyt per bygg
- `flow_nodes`: Noder i prosessflyt
- `flow_edges`: Forbindelser mellom noder

### Storage
- **fdv bucket**: Private PDF filer med signerte URL'er

## 🎨 Design System

### Tokens
Alle farger og avstander definert i `tokens.css` med:
- Semantiske tokennavn
- Dark mode support
- Skandinavisk designestetikk

### Typography
- Inter font family
- Responsiv typografiskala
- Tilgjengelighetsfokus

## 🧪 Code Quality

### ESLint + Prettier
```bash
# Lint checking
npm run lint

# Format kode
npm run format
```

### TypeScript
- Strict mode aktivert
- Type-safe Supabase integrering
- Komplett type definitioner

## 🐛 Feilsøking

### Vanlige problemer

**Build feil med ReactFlow:**
- Sørg for at `reactflow` og CSS er korrekt importert

**Supabase connection feil:**
- Sjekk at miljøvariabler er satt korrekt
- Verifiser at Supabase URL/key er gyldige

**RLS permission denied:**
- Kontroller at brukeren har riktig app_metadata.role
- Sjekk at policies er korrekt implementert

**File upload feil:**
- Verifiser at fdv bucket eksisterer
- Sjekk storage policies

### Debug tips
- Bruk Network tab i utviklerverktøy for API-kall
- Sjekk Supabase logs i dashboard
- Console.log i auth.ts for brukerrolle debugging

## 📝 Lisens

© 2025 Tempia. Alle rettigheter forbeholdt.

## 🤝 Support

For teknisk support eller spørsmål om implementering, kontakt utviklingsteamet.
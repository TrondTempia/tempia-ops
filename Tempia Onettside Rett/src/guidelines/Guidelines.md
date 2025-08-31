# Tempia Design System Guidelines

## Design Token Architecture

Tempia bruker et strukturert token-system som kan automatisk synkroniseres fra Figma. Dette sikrer at designet er "kilden til sannhet" og at koden alltid reflekterer de nyeste design-beslutningene.

### Token-hierarki

1. **Base Tokens** (Rå verdier fra Figma)
   ```css
   --color-blue-900: #111827;
   --space-4: 16px;
   --radius-sm: 2px;
   ```

2. **Semantic Tokens** (Kontekstuell bruk)
   ```css
   --color-brand-primary: var(--color-blue-900);
   --space-component-lg: var(--space-4);
   --radius-component-sm: var(--radius-sm);
   ```

3. **Component Tokens** (Spesifikke komponenter)
   ```css
   --button-bg-primary: var(--color-brand-primary);
   --button-radius: var(--radius-component-sm);
   ```

### Naming Convention

- **Bruk semantiske navn**: `color-brand-primary` ikke `color-blue-900`
- **Grupper relaterte tokens**: `button-*`, `card-*`, `nav-*`
- **Følg kategori/type/variant mønster**: `color/text/primary`, `space/component/lg`

### Komponent-utvikling

#### ❌ Ikke gjør dette:
```tsx
// Ikke bruk rå hex-verdier
<button style={{ backgroundColor: '#111827' }}>
```

#### ✅ Gjør dette:
```tsx
// Bruk semantiske tokens
<button style={{ backgroundColor: 'var(--button-bg-primary)' }}>
```

### Automatisk Figma-synkronisering

Systemet støtter automatisk synkronisering fra Figma:

1. **Endre tokens i Figma** → Design tokens i Figma Variables
2. **GitHub Actions** → Kjører hver 6. time eller manuelt
3. **Oppdater kode** → Automatisk commit til repository
4. **Vercel deployment** → Ny build med oppdaterte tokens

### Temaer

Token-systemet støtter multiple temaer:

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

### Komponenter

Alle Tempia-komponenter følger disse prinsippene:

- **Button**: Bruker `--button-*` tokens for konsistent styling
- **Card**: Bruker `--card-*` tokens for layout og utseende
- **Navigation**: Bruker `--nav-*` tokens for interaktive tilstander

### Typography

Typography-systemet bruker semantiske tokens:

```css
--text-display-size: var(--font-size-3xl);
--text-h1-size: var(--font-size-2xl);
--text-body-size: var(--font-size-base);
```

### Spacing

8-punkt grid-system:

```css
--space-1: 4px;   /* 0.5 * 8 */
--space-2: 8px;   /* 1 * 8 */
--space-3: 12px;  /* 1.5 * 8 */
--space-4: 16px;  /* 2 * 8 */
```

### Border Radius

Minimal avrunding for industriell estetikk:

```css
--radius-component-sm: 2px;  /* Knapper, badges */
--radius-component-md: 3px;  /* Kort, inputs */
--radius-component-lg: 4px;  /* Modaler, panels */
```

## Implementering

### Ny komponent
1. Definer component tokens i `/styles/tokens.css`
2. Bruk tokens i komponenten
3. Test med både lys og mørkt tema
4. Dokumenter i Brand Guide

### Token-endringer
1. Endre tokens i Figma
2. GitHub Actions synkroniserer automatisk
3. Vercel deployer oppdatert versjon
4. Ingen kode-endringer nødvendig

## Best Practices

- **Single source of truth**: Figma er alltid kilden til design-tokens
- **Semantic naming**: Bruk meningsfulle navn som beskriver bruk, ikke utseende
- **Konsistens**: Alle komponenter bruker samme token-struktur
- **Dokumentasjon**: Hold Brand Guide oppdatert med token-endringer
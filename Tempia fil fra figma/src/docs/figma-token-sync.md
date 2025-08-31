# 🎨 Figma Token Sync Setup

This document explains how to set up automatic design token synchronization from Figma to your codebase, enabling a true "Figma as source of truth" workflow.

## Architecture Overview

```
Figma Design Tokens → Figma API → GitHub Actions → CSS Tokens → Vercel Deployment
```

**Benefits:**
- ✅ Single source of truth in Figma
- ✅ Automatic code updates when designs change
- ✅ No manual copy-paste of design values
- ✅ Semantic token structure supports theming
- ✅ Developer-friendly CSS custom properties

## Token Structure

### 1. Base Tokens (Raw Values)
```css
/* These come directly from Figma and never reference other tokens */
--color-blue-900: #111827;
--color-slate-50: #F8FAFC;
--space-4: 16px;
--radius-sm: 2px;
```

### 2. Semantic Tokens (Contextual Usage)
```css
/* These reference base tokens and provide semantic meaning */
--color-brand-primary: var(--color-blue-900);
--color-bg-page: var(--color-slate-50);
--space-component-lg: var(--space-4);
--radius-component-sm: var(--radius-sm);
```

### 3. Component Tokens (Specific Components)
```css
/* These reference semantic tokens for specific components */
--button-bg-primary: var(--color-brand-primary);
--button-radius: var(--radius-component-sm);
--card-padding: var(--space-component-lg);
```

## Setup Instructions

### 1. Figma Configuration

#### Option A: Figma Variables (Recommended)
1. Create Variables in Figma with semantic names:
   - `color/brand/primary`
   - `color/text/primary`
   - `space/component/lg`
   - `radius/component/sm`

2. Use the Figma Variables API to fetch tokens

#### Option B: Figma Styles
1. Create Color/Text/Effect styles with semantic names
2. Use the Figma Styles API to fetch tokens

#### Option C: Design Token Plugin
1. Install a design token plugin like "Design Tokens" or "Tokens Studio"
2. Export tokens in W3C Design Token format
3. Store tokens in Figma file description or external storage

### 2. GitHub Secrets Configuration

Add these secrets to your GitHub repository:

```bash
# Required
FIGMA_ACCESS_TOKEN=fig_xxxxxxxxxxxxxxxxxxxx
FIGMA_FILE_ID=xxxxxxxxxxxxxxxxxxxx

# Optional (for Vercel integration)
VERCEL_TOKEN=xxxxxxxxxxxxxxxxxxxx
VERCEL_ORG_ID=team_xxxxxxxxxxxxxxxxxxxx
VERCEL_PROJECT_ID=prj_xxxxxxxxxxxxxxxxxxxx
```

### 3. Figma Access Token

1. Go to Figma → Settings → Personal Access Tokens
2. Generate a new token with these scopes:
   - `file:read` (to read file data)
   - `file:variables` (if using Variables)
3. Copy the token and add it to GitHub Secrets

### 4. Find Your Figma File ID

From your Figma file URL:
```
https://www.figma.com/file/ABC123DEF456/Your-File-Name
                              ↑
                        This is your File ID
```

### 5. Workflow Triggers

The sync workflow runs:
- **Every 6 hours** (scheduled)
- **Manually** (workflow_dispatch)
- **On webhook** (repository_dispatch) - when Figma triggers it

## Usage in Components

### ❌ Don't: Use raw hex values
```tsx
const Button = () => (
  <button style={{ backgroundColor: '#111827', borderRadius: '2px' }}>
    Click me
  </button>
);
```

### ✅ Do: Use semantic tokens
```tsx
const Button = () => (
  <button style={{ 
    backgroundColor: 'var(--button-bg-primary)', 
    borderRadius: 'var(--button-radius)' 
  }}>
    Click me
  </button>
);
```

### ✅ Better: Use component tokens
```tsx
const Button = ({ variant = 'primary' }) => (
  <button 
    className="transition-colors"
    style={{
      backgroundColor: `var(--button-bg-${variant})`,
      borderRadius: 'var(--button-radius)',
      padding: 'var(--button-padding-y) var(--button-padding-x)'
    }}
  >
    Click me
  </button>
);
```

## Theming Support

With semantic tokens, you can easily support themes:

```css
/* Light theme (default) */
:root {
  --color-bg-page: var(--color-slate-50);
  --color-text-primary: var(--color-slate-900);
}

/* Dark theme */
.dark {
  --color-bg-page: var(--color-slate-900);
  --color-text-primary: var(--color-slate-50);
}
```

## Figma Webhook Setup (Optional)

For instant updates when tokens change in Figma:

1. Use a service like Zapier or custom webhook
2. Configure Figma to trigger webhook on file changes
3. Webhook should call GitHub API to trigger the sync workflow:

```bash
curl -X POST \
  https://api.github.com/repos/your-org/your-repo/dispatches \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.everest-preview+json" \
  -d '{"event_type": "figma-tokens-updated"}'
```

## Monitoring & Debugging

### Check Sync Status
- Go to Actions tab in GitHub
- Look for "🎨 Sync Figma Design Tokens" workflow runs

### Common Issues

1. **Invalid Figma Token**: Check token permissions and expiry
2. **File ID not found**: Verify Figma file ID is correct
3. **No changes detected**: Make sure token names match expected format
4. **Vercel deployment fails**: Check Vercel token and project ID

### Logs
The workflow provides detailed logs showing:
- Which tokens were fetched
- What changes were detected
- Whether deployment was triggered

## File Structure

```
styles/
├── tokens.css          # Auto-generated base + semantic tokens
├── globals.css         # Tailwind mappings + component styles  
├── figma-sync.js       # Token sync script
└── themes/
    ├── light.css       # Light theme overrides
    └── dark.css        # Dark theme overrides

.github/workflows/
└── sync-figma-tokens.yml  # GitHub Actions workflow
```

## Best Practices

1. **Use semantic names**: `color-brand-primary` not `color-blue-900`
2. **Group related tokens**: `button-*`, `card-*`, `nav-*`
3. **Document token purpose**: Add descriptions in Figma
4. **Test token changes**: Use feature branches for major updates
5. **Keep it simple**: Don't over-engineer the token structure
6. **Version your tokens**: Consider using git tags for major token releases

## Troubleshooting

### Tokens not updating?
1. Check the GitHub Actions log
2. Verify Figma file permissions
3. Ensure token names match the expected format
4. Check if the file was actually modified in Figma

### Styles not applying?
1. Check browser dev tools for CSS custom property values
2. Verify the CSS import order
3. Look for Tailwind class conflicts
4. Check if tokens are properly mapped to Tailwind variables

## Future Enhancements

- [ ] Support for multiple Figma files
- [ ] Token validation and linting
- [ ] Visual diff of token changes
- [ ] Slack/Discord notifications
- [ ] Automatic PR creation for token updates
- [ ] Token usage analytics
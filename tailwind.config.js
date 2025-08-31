/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
extend: {
  colors: {
    primary: "var(--color-brand-primary)",
    "primary-foreground": "var(--color-brand-foreground)",
    muted: "var(--color-bg-muted)",
    "muted-foreground": "var(--color-text-muted)",
    success: "var(--color-success-bg)",
    "success-foreground": "var(--color-success-fg)",
    warning: "var(--color-warning-bg)",
    "warning-foreground": "var(--color-warning-fg)",
    danger: "var(--color-error-bg)",
    "danger-foreground": "var(--color-error-fg)"
  },
  borderRadius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    full: "var(--radius-full)"
  },
  fontSize: {
    caption: ["var(--font-size-caption)", { lineHeight: "var(--leading-caption)" }],
    "text-small": ["var(--font-size-text-small)", { lineHeight: "var(--leading-small)" }]
  }
}
  },
  plugins: [],
};

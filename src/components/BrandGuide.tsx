import { Button } from "./Tempia/Button";
import { Card } from "./Tempia/Card";
import { Badge } from "./Tempia/Badge";
import { NavItem } from "./Tempia/NavItem";
import { ChartPlaceholder } from "./Tempia/ChartPlaceholder";

// Bruk de lokale bildene du nettopp flyttet
import tempiaLogo from "../assets/tempia-logo.png";
import backgroundImage from "../assets/background.png";

// Importer bare ikonene du faktisk bruker
import { Home, Settings, User, FileText, Download } from "lucide-react";

export function BrandGuide() {
  const colors = {
    brand: { primary: "#111827", accent: "#2563EB" },
    text: { default: "#0F172A", muted: "#475569" },
    background: { page: "#F8FAFC", surface: "#FFFFFF" },
    border: { default: "#E5E7EB" },
    neutral: {
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#E5E7EB",
      300: "#D1D5DB",
      500: "#6B7280",
      700: "#374151",
    },
    state: { success: "#16A34A", warning: "#F59E0B", danger: "#DC2626" },
  };

  const typography = {
    display: { size: "32px", lineHeight: "40px", weight: 700 },
    h1: { size: "24px", lineHeight: "32px", weight: 700 },
    h2: { size: "20px", lineHeight: "28px", weight: 600 },
    h3: { size: "18px", lineHeight: "28px", weight: 600 },
    body: { size: "16px", lineHeight: "24px", weight: 400 },
    small: { size: "14px", lineHeight: "20px", weight: 400 },
    caption: { size: "12px", lineHeight: "16px", weight: 400 },
  };

  const tokenJSON = {
    color: {
      brand: { primary: "#111827", accent: "#2563EB" },
      text: { default: "#0F172A", muted: "#475569" },
      bg: { page: "#F8FAFC", surface: "#FFFFFF" },
      border: { default: "#E5E7EB" },
      neutral: {
        "50": "#F8FAFC",
        "100": "#F1F5F9",
        "200": "#E5E7EB",
        "300": "#D1D5DB",
        "500": "#6B7280",
        "700": "#374151",
      },
      state: { success: "#16A34A", warning: "#F59E0B", danger: "#DC2626" },
    },
    radius: { sm: 2, md: 3, lg: 4, full: 999 },
    shadow: {
      card: "0 1px 2px rgba(0,0,0,0.06), 0 1px 1px rgba(0,0,0,0.04)",
      elevated: "0 8px 24px rgba(15,23,42,0.08)",
    },
    space: [4, 8, 12, 16, 24, 32, 48],
    typography: {
      fontFamily: "Inter",
      tokens: {
        display: { size: 32, lineHeight: 40, weight: 700 },
        h1: { size: 24, lineHeight: 32, weight: 700 },
        h2: { size: 20, lineHeight: 28, weight: 600 },
        h3: { size: 18, lineHeight: 28, weight: 600 },
        body: { size: 16, lineHeight: 24, weight: 400 },
        small: { size: 14, lineHeight: 20, weight: 400 },
        caption: { size: 12, lineHeight: 16, weight: 400 },
      },
    },
    components: {
      button: { borderRadius: 2, note: "Minimal rounding for industrial aesthetic" },
    },
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(tokenJSON, null, 2));
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div
            className="font-bold text-foreground"
            style={{ fontSize: "var(--text-display)", lineHeight: "var(--leading-display)" }}
          >
            Tempia Brand Guide
          </div>
          <p
            className="text-muted-foreground max-w-2xl mx-auto"
            style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" }}
          >
            Skandinavisk designsystem for verktøyside til ansatte med ren estetikk og profesjonell identitet
          </p>
        </div>

        {/* Brand Assets */}
        <Card title="Brand Assets">
          <div className="space-y-8">
            {/* Logo */}
            <div>
              <h4
                className="font-semibold text-foreground mb-4"
                style={{ fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)" }}
              >
                Logo
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div
                    className="bg-white p-8 border border-border flex items-center justify-center"
                    style={{ borderRadius: "var(--radius-md)" }}
                  >
                    <img src={tempiaLogo} alt="Tempia Logo" className="h-16 w-auto object-contain" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium" style={{ fontSize: "var(--text-small)" }}>
                      Primary Logo
                    </div>
                    <div className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                      På lys bakgrunn
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div
                    className="bg-neutral-700 p-8 border border-border flex items-center justify-center"
                    style={{ borderRadius: "var(--radius-md)" }}
                  >
                    <img
                      src={tempiaLogo}
                      alt="Tempia Logo"
                      className="h-16 w-auto object-contain brightness-0 invert"
                    />
                  </div>
                  <div className="text-center">
                    <div className="font-medium" style={{ fontSize: "var(--text-small)" }}>
                      Inverted Logo
                    </div>
                    <div className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                      På mørk bakgrunn
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Image */}
            <div>
              <h4
                className="font-semibold text-foreground mb-4"
                style={{ fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)" }}
              >
                Background Image
              </h4>
              <div className="space-y-4">
                <div className="relative w-full h-48 overflow-hidden" style={{ borderRadius: "var(--radius-md)" }}>
                  <img
                    src={backgroundImage}
                    alt="Norwegian landscape background"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <img
                        src={tempiaLogo}
                        alt="Tempia Logo"
                        className="h-12 w-auto object-contain brightness-0 invert mb-2 mx-auto"
                      />
                      <p style={{ fontSize: "var(--text-body)" }}>Verktøyside for ansatte</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-medium" style={{ fontSize: "var(--text-small)" }}>
                    Dramatisk norsk landskap
                  </div>
                  <div className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                    Brukes som bakgrunnsbilde på login-siden med 40% mørk overlay for lesbarhet
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Color Palette */}
        <Card title="Color Palette">
          <div className="space-y-8">
            {/* Brand Colors */}
            <div>
              <h4
                className="font-semibold text-foreground mb-4"
                style={{ fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)" }}
              >
                Brand Colors
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="w-full h-16 rounded-lg shadow-card" style={{ backgroundColor: colors.brand.primary }} />
                  <div>
                    <div className="font-medium" style={{ fontSize: "var(--text-small)" }}>
                      Primary
                    </div>
                    <div className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                      color.brand.primary
                    </div>
                    <div className="font-mono text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                      {colors.brand.primary}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-16 rounded-lg shadow-card" style={{ backgroundColor: colors.brand.accent }} />
                  <div>
                    <div className="font-medium" style={{ fontSize: "var(--text-small)" }}>
                      Accent
                    </div>
                    <div className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                      color.brand.accent
                    </div>
                    <div className="font-mono text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                      {colors.brand.accent}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Neutral Scale */}
            <div>
              <h4
                className="font-semibold text-foreground mb-4"
                style={{ fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)" }}
              >
                Neutral Scale
              </h4>
              <div className="grid grid-cols-6 gap-3">
                {Object.entries(colors.neutral).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="w-full h-12 rounded-lg border border-border" style={{ backgroundColor: value }} />
                    <div>
                      <div className="font-medium text-center" style={{ fontSize: "var(--text-caption)" }}>
                        {key}
                      </div>
                      <div className="font-mono text-center text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* State Colors */}
            <div>
              <h4
                className="font-semibold text-foreground mb-4"
                style={{ fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)" }}
              >
                State Colors
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(colors.state).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="w-full h-12 rounded-lg shadow-card" style={{ backgroundColor: value }} />
                    <div>
                      <div className="font-medium capitalize" style={{ fontSize: "var(--text-small)" }}>
                        {key}
                      </div>
                      <div className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                        color.state.{key}
                      </div>
                      <div className="font-mono text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Typography Scale */}
        <Card title="Typography Scale">
          <div className="space-y-6">
            <div className="text-muted-foreground" style={{ fontSize: "var(--text-body)" }}>
              Font Family: Inter (fallback: system UI)
            </div>
            <div className="space-y-4">
              {Object.entries(typography).map(([key, style]) => (
                <div key={key} className="flex items-center justify-between border-b border-border pb-4">
                  <div
                    className="font-medium text-foreground"
                    style={{ fontSize: style.size, lineHeight: style.lineHeight, fontWeight: style.weight }}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)} Sample Text
                  </div>
                  <div className="text-right text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                    <div>
                      {style.size} / {style.lineHeight}
                    </div>
                    <div>Weight: {style.weight}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Component Examples */}
        <Card title="Component Library">
          <div className="space-y-8">
            {/* Buttons */}
            <div className="space-y-4">
              <h4
                className="font-semibold text-foreground"
                style={{ fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)" }}
              >
                Buttons
              </h4>
              <div className="text-muted-foreground mb-4" style={{ fontSize: "var(--text-small)" }}>
                Meget mørk blå primærfarge (nærmest sort) med minimal avrunding (2px) for industriell estetikk
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="sm">
                  Small
                </Button>
                <Button variant="primary" size="md">
                  Medium
                </Button>
                <Button variant="primary" size="lg">
                  Large
                </Button>
              </div>
            </div>

            {/* Badges */}
            <div className="space-y-4">
              <h4
                className="font-semibold text-foreground"
                style={{ fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)" }}
              >
                Badges
              </h4>
              <div className="flex flex-wrap gap-4 items-center">
                <Badge variant="default" style="subtle">
                  Default
                </Badge>
                <Badge variant="brand" style="subtle">
                  Brand
                </Badge>
                <Badge variant="success" style="subtle">
                  Success
                </Badge>
                <Badge variant="warning" style="subtle">
                  Warning
                </Badge>
                <Badge variant="error" style="subtle">
                  Error
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <Badge variant="brand" style="solid">
                  Brand Solid
                </Badge>
                <Badge variant="success" style="solid">
                  Success Solid
                </Badge>
                <Badge variant="warning" style="solid">
                  Warning Solid
                </Badge>
                <Badge variant="error" style="solid">
                  Error Solid
                </Badge>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h4
                className="font-semibold text-foreground"
                style={{ fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)" }}
              >
                Navigation
              </h4>
              <div className="w-64 space-y-2">
                <NavItem icon={<Home />} active>
                  Dashboard
                </NavItem>
                <NavItem icon={<FileText />}>Documents</NavItem>
                <NavItem icon={<Settings />}>Settings</NavItem>
                <NavItem icon={<User />}>Profile</NavItem>
              </div>
            </div>

            {/* Charts */}
            <div className="space-y-4">
              <h4
                className="font-semibold text-foreground"
                style={{ fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)" }}
              >
                Chart Placeholders
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <ChartPlaceholder type="line" title="Line Chart" height={200} />
                <ChartPlaceholder type="bar" title="Bar Chart" height={200} />
              </div>
            </div>
          </div>
        </Card>

        {/* Design Tokens JSON */}
        <Card title="Design Tokens (Dev Handoff)">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground" style={{ fontSize: "var(--text-body)" }}>
                JSON format for development implementation
              </p>
              <Button variant="secondary" onClick={copyToClipboard}>
                <Download className="w-4 h-4 mr-2" />
                Copy JSON
              </Button>
            </div>
            <div className="bg-neutral-50 p-4 overflow-x-auto" style={{ borderRadius: "var(--radius-md)" }}>
              <pre className="text-neutral-700" style={{ fontSize: "var(--text-small)", lineHeight: "var(--leading-small)" }}>
                {JSON.stringify(tokenJSON, null, 2)}
              </pre>
            </div>
          </div>
        </Card>

        {/* Effects & Spacing */}
        <Card title="Effects & Spacing">
          <div className="space-y-8">
            {/* Shadows */}
            <div className="space-y-4">
              <h4
                className="font-semibold text-foreground"
                style={{ fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)" }}
              >
                Shadows
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div
                    className="w-full h-20 bg-card shadow-card flex items-center justify-center"
                    style={{ borderRadius: "var(--radius-md)" }}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                      Card Shadow
                    </span>
                  </div>
                  <div className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                    shadow.card
                  </div>
                </div>
                <div className="space-y-2">
                  <div
                    className="w-full h-20 bg-card shadow-elevated flex items-center justify-center"
                    style={{ borderRadius: "var(--radius-md)" }}
                  >
                    <span className="text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                      Elevated Shadow
                    </span>
                  </div>
                  <div className="text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                    shadow.elevated
                  </div>
                </div>
              </div>
            </div>

            {/* Border Radius */}
            <div className="space-y-4">
              <h4
                className="font-semibold text-foreground"
                style={{ fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)" }}
              >
                Border Radius
              </h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="w-full h-16 bg-neutral-200 flex items-center justify-center" style={{ borderRadius: "2px" }}>
                    <span className="text-neutral-700" style={{ fontSize: "var(--text-caption)" }}>
                      SM
                    </span>
                  </div>
                  <div className="text-center text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                    radius.sm (2px)
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-16 bg-neutral-200 flex items-center justify-center" style={{ borderRadius: "3px" }}>
                    <span className="text-neutral-700" style={{ fontSize: "var(--text-caption)" }}>
                      MD
                    </span>
                  </div>
                  <div className="text-center text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                    radius.md (3px)
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-16 bg-neutral-200 flex items-center justify-center" style={{ borderRadius: "4px" }}>
                    <span className="text-neutral-700" style={{ fontSize: "var(--text-caption)" }}>
                      LG
                    </span>
                  </div>
                  <div className="text-center text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                    radius.lg (4px)
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-16 bg-neutral-200 flex items-center justify-center" style={{ borderRadius: "999px" }}>
                    <span className="text-neutral-700" style={{ fontSize: "var(--text-caption)" }}>
                      FULL
                    </span>
                  </div>
                  <div className="text-center text-muted-foreground" style={{ fontSize: "var(--text-caption)" }}>
                    radius.full (999px)
                  </div>
                </div>
              </div>
            </div>

            {/* Spacing Scale */}
            <div className="space-y-4">
              <h4
                className="font-semibold text-foreground"
                style={{ fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)" }}
              >
                Spacing Scale (8pt Grid)
              </h4>
              <div className="space-y-2">
                {[4, 8, 12, 16, 24, 32, 48].map((space) => (
                  <div key={space} className="flex items-center gap-4">
                    <div className="w-16 text-muted-foreground" style={{ fontSize: "var(--text-small)" }}>
                      {space}px
                    </div>
                    <div className="h-4 bg-brand-primary" style={{ width: `${space}px` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Palette, Type, Layout, Layers, Eye, EyeOff } from 'lucide-react';

export default function BrandGuide() {
  const [darkMode, setDarkMode] = useState(false);

  const colorTokens = [
    { name: 'Primary', token: '--color-primary', class: 'bg-primary' },
    { name: 'Secondary', token: '--color-secondary', class: 'bg-secondary' },
    { name: 'Accent', token: '--color-accent', class: 'bg-accent' },
    { name: 'Muted', token: '--color-muted', class: 'bg-muted' },
    { name: 'Card', token: '--color-card', class: 'bg-card' },
    { name: 'Background', token: '--color-background', class: 'bg-background' },
  ];

  const typographyScale = [
    { name: 'Display', class: 'text-4xl font-bold', description: 'Hero headings' },
    { name: 'H1', class: 'text-3xl font-bold', description: 'Page titles' },
    { name: 'H2', class: 'text-2xl font-semibold', description: 'Section titles' },
    { name: 'H3', class: 'text-xl font-semibold', description: 'Subsections' },
    { name: 'Body', class: 'text-base', description: 'Body text' },
    { name: 'Small', class: 'text-sm', description: 'Small text' },
    { name: 'Caption', class: 'text-xs', description: 'Captions' },
  ];

  const components = [
    {
      name: 'Button Primary',
      element: (
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-colors shadow-card">
          Primary Button
        </button>
      )
    },
    {
      name: 'Button Secondary',
      element: (
        <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-colors border border-border shadow-card">
          Secondary Button
        </button>
      )
    },
    {
      name: 'Card',
      element: (
        <div className="bg-card border border-border rounded-lg p-4 shadow-card">
          <h4 className="font-semibold text-foreground mb-2">Card Title</h4>
          <p className="text-muted-foreground text-sm">This is a sample card component with proper styling.</p>
        </div>
      )
    },
    {
      name: 'Input',
      element: (
        <div className="w-full">
          <label className="block text-sm font-medium text-foreground mb-2">Label</label>
          <input 
            type="text" 
            placeholder="Placeholder text" 
            className="w-full px-3 py-2 border border-border rounded-md bg-input-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
      )
    },
  ];

  return (
    <div className={`min-h-screen bg-background transition-colors ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="h-10 w-28 bg-primary rounded flex items-center justify-center"
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                <span className="text-primary-foreground font-bold">TEMPIA</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Design System</h1>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:opacity-90 transition-colors"
            >
              {darkMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {darkMode ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-8">
        <div className="space-y-12">
          {/* Brand Identity */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Layers className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Brand Identity</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Light Logo */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Light Background</h3>
                <div className="bg-background p-8 rounded-md border border-border flex items-center justify-center">
                  <div 
                    className="h-16 w-48 bg-primary rounded flex items-center justify-center"
                    style={{ borderRadius: 'var(--radius-sm)' }}
                  >
                    <span className="text-primary-foreground font-bold text-xl">TEMPIA</span>
                  </div>
                </div>
              </div>

              {/* Dark Logo */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Dark Background</h3>
                <div className="bg-foreground p-8 rounded-md border border-border flex items-center justify-center">
                  <div 
                    className="h-16 w-48 bg-background rounded flex items-center justify-center brightness-0 invert"
                    style={{ borderRadius: 'var(--radius-sm)' }}
                  >
                    <span className="font-bold text-xl">TEMPIA</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Color Palette */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Color Palette</h2>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 shadow-card">
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {colorTokens.map((color) => (
                  <div key={color.name} className="space-y-3">
                    <div className={`${color.class} h-20 rounded-md border border-border shadow-card`}></div>
                    <div>
                      <div className="font-medium text-foreground text-sm">{color.name}</div>
                      <code className="text-xs text-muted-foreground font-mono">{color.token}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Typography */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Type className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Typography</h2>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 shadow-card">
              <div className="space-y-6">
                {typographyScale.map((type) => (
                  <div key={type.name} className="flex items-center gap-8">
                    <div className="w-20 text-sm text-muted-foreground font-medium">{type.name}</div>
                    <div className={`${type.class} text-foreground flex-1`}>
                      The quick brown fox jumps over the lazy dog
                    </div>
                    <div className="text-xs text-muted-foreground w-32">{type.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Components */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Layout className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Components</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {components.map((component) => (
                <div key={component.name} className="bg-card border border-border rounded-lg p-6 shadow-card">
                  <h3 className="font-semibold text-foreground mb-4">{component.name}</h3>
                  <div className="p-4 bg-background rounded-md border border-border">
                    {component.element}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Design Tokens */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Layers className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Design Tokens</h2>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 shadow-card">
              <div className="prose prose-sm max-w-none text-foreground">
                <h3 className="text-foreground">Token Architecture</h3>
                <p className="text-muted-foreground">
                  Tempia bruker et strukturert token-system som kan automatisk synkroniseres fra Figma.
                  Dette sikrer at designet er "kilden til sannhet" og at koden alltid reflekterer de nyeste design-beslutningene.
                </p>
                
                <h4 className="text-foreground mt-6">Semantic Tokens</h4>
                <div className="bg-muted/30 p-4 rounded-md">
                  <code className="text-sm text-foreground">
                    --color-brand-primary: var(--color-blue-900);<br/>
                    --space-component-lg: var(--space-4);<br/>
                    --radius-component-sm: var(--radius-sm);
                  </code>
                </div>

                <h4 className="text-foreground mt-6">Component Usage</h4>
                <div className="bg-muted/30 p-4 rounded-md">
                  <code className="text-sm text-foreground">
                    {'<button style={{ backgroundColor: "var(--color-primary)" }}>'}
                  </code>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
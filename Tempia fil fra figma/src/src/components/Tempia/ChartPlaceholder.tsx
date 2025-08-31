import React from 'react';

interface ChartPlaceholderProps {
  type: 'line' | 'bar' | 'pie';
  title: string;
  height?: number;
}

export function ChartPlaceholder({ type, title, height = 200 }: ChartPlaceholderProps) {
  const getChartIcon = () => {
    switch (type) {
      case 'line': return '📈';
      case 'bar': return '📊';
      case 'pie': return '🥧';
      default: return '📊';
    }
  };

  const getChartName = () => {
    switch (type) {
      case 'line': return 'Linjediagram';
      case 'bar': return 'Stolpediagram';
      case 'pie': return 'Kakediagram';
      default: return 'Diagram';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-h3-size)', lineHeight: 'var(--text-h3-line-height)' }}>{title}</h4>
        <div className="flex items-center gap-4 text-muted-foreground" style={{ fontSize: 'var(--text-small-size)', lineHeight: 'var(--text-small-line-height)' }}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span>Serie 1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span>Serie 2</span>
          </div>
        </div>
      </div>
      
      <div 
        className="bg-neutral-50 flex items-center justify-center border-2 border-dashed border-neutral-200"
        style={{ 
          height: `${height}px`,
          borderRadius: 'var(--radius-component-md)'
        }}
      >
        <div className="text-center text-neutral-500">
          <div className="text-4xl mb-2">
            {getChartIcon()}
          </div>
          <div style={{ fontSize: 'var(--text-small-size)', lineHeight: 'var(--text-small-line-height)' }}>
            {getChartName()} Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
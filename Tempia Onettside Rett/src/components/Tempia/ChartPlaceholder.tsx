import React from 'react';

interface ChartPlaceholderProps {
  type: 'line' | 'bar';
  title: string;
  height?: number;
}

export function ChartPlaceholder({ type, title, height = 200 }: ChartPlaceholderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--leading-h3)' }}>{title}</h4>
        <div className="flex items-center gap-4 text-muted-foreground" style={{ fontSize: 'var(--text-small)', lineHeight: 'var(--leading-small)' }}>
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
          borderRadius: 'var(--radius-md)'
        }}
      >
        <div className="text-center text-neutral-500">
          <div className="text-4xl mb-2">
            {type === 'line' ? '📈' : '📊'}
          </div>
          <div style={{ fontSize: 'var(--text-small)', lineHeight: 'var(--leading-small)' }}>
            {type === 'line' ? 'Linjediagram' : 'Stolpediagram'} Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
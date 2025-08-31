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
        <h4 
          className="font-semibold" 
          style={{ 
            fontSize: 'var(--text-h3-size)', 
            lineHeight: 'var(--text-h3-line-height)',
            color: 'var(--color-text-primary)',
            fontWeight: 'var(--font-weight-semibold)'
          }}
        >
          {title}
        </h4>
        <div 
          className="flex items-center gap-4" 
          style={{ 
            fontSize: 'var(--text-small-size)', 
            lineHeight: 'var(--text-small-line-height)',
            color: 'var(--color-text-secondary)'
          }}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: 'var(--color-brand-primary)' }}
            ></div>
            <span>Serie 1</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: 'var(--color-brand-accent)' }}
            ></div>
            <span>Serie 2</span>
          </div>
        </div>
      </div>
      
      <div 
        className="flex items-center justify-center border-2 border-dashed"
        style={{ 
          height: `${height}px`,
          borderRadius: 'var(--radius-component-md)',
          backgroundColor: 'var(--color-bg-subtle)',
          borderColor: 'var(--color-border-default)'
        }}
      >
        <div 
          className="text-center"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <div className="text-4xl mb-2">
            {type === 'line' ? '📈' : '📊'}
          </div>
          <div 
            style={{ 
              fontSize: 'var(--text-small-size)', 
              lineHeight: 'var(--text-small-line-height)' 
            }}
          >
            {type === 'line' ? 'Linjediagram' : 'Stolpediagram'} Placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
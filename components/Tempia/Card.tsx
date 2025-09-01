import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className = '', title }: CardProps) {
  return (
    <div 
      className={`overflow-hidden ${className}`} 
      style={{ 
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-component-md)',
        padding: '0',
        border: `1px solid var(--color-border-default)`,
        boxShadow: 'var(--shadow-card)'
      }}
    >
      {title && (
        <div 
          style={{ 
            padding: 'var(--space-component-xl)',
            borderBottom: `1px solid var(--color-border-default)`,
            fontSize: 'var(--text-h3-size)',
            lineHeight: 'var(--text-h3-line-height)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text-primary)'
          }}
        >
          {title}
        </div>
      )}
      <div style={{ padding: 'var(--space-component-xl)' }}>
        {children}
      </div>
    </div>
  );
}
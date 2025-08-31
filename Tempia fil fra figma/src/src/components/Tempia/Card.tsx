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
        backgroundColor: 'var(--card-bg)',
        borderRadius: 'var(--card-radius)',
        padding: '0',
        border: `1px solid var(--card-border)`,
        boxShadow: 'var(--card-shadow)'
      }}
    >
      {title && (
        <div 
          style={{ 
            padding: 'var(--card-padding)',
            borderBottom: `1px solid var(--card-border)`,
            fontSize: 'var(--text-h3-size)',
            lineHeight: 'var(--text-h3-line-height)',
            fontWeight: 'var(--text-h3-weight)',
            color: 'var(--color-text-primary)'
          }}
        >
          {title}
        </div>
      )}
      <div style={{ padding: 'var(--card-padding)' }}>
        {children}
      </div>
    </div>
  );
}
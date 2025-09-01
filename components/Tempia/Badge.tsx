import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'brand' | 'accent';
  style?: 'subtle' | 'solid';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'default', style = 'subtle', size = 'sm' }: BadgeProps) {
  const getVariantClasses = () => {
    const styles = {
      subtle: {
        default: 'bg-neutral-100 text-muted-foreground',
        success: 'bg-green-50 text-green-700 border border-green-200',
        warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
        error: 'bg-red-50 text-red-700 border border-red-200',
        brand: 'bg-teal-50 text-teal-700 border border-teal-200',
        accent: 'bg-blue-50 text-blue-700 border border-blue-200'
      },
      solid: {
        default: 'bg-neutral-500 text-white',
        success: 'bg-success text-white',
        warning: 'bg-warning text-white',
        error: 'bg-danger text-white',
        brand: 'bg-primary text-primary-foreground',
        accent: 'bg-accent text-accent-foreground'
      }
    };
    return styles[style][variant];
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1',
    md: 'px-3 py-1.5'
  };
  
  const sizeStyle = {
    sm: { fontSize: 'var(--text-caption)', lineHeight: 'var(--leading-caption)' },
    md: { fontSize: 'var(--text-small)', lineHeight: 'var(--leading-small)' }
  };
  
  return (
    <span 
      className={`inline-flex items-center font-medium ${getVariantClasses()} ${sizeClasses[size]}`}
      style={{ 
        borderRadius: 'var(--radius-full)',
        ...sizeStyle[size]
      }}
    >
      {children}
    </span>
  );
}
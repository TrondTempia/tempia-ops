import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'error';
  style?: 'subtle' | 'solid';
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'default', 
  style = 'subtle',
  className = '' 
}: BadgeProps) {
  const baseClasses = "inline-flex items-center font-medium";
  
  const getBackgroundColor = () => {
    if (style === 'solid') {
      switch (variant) {
        case 'brand': return 'var(--badge-bg-brand)';
        case 'success': return 'var(--color-state-success)';
        case 'warning': return 'var(--color-state-warning)';
        case 'error': return 'var(--color-state-error)';
        default: return 'var(--badge-bg-default)';
      }
    } else {
      switch (variant) {
        case 'brand': return 'rgba(37, 99, 235, 0.1)';
        case 'success': return 'rgba(22, 163, 74, 0.1)';
        case 'warning': return 'rgba(245, 158, 11, 0.1)';
        case 'error': return 'rgba(220, 38, 38, 0.1)';
        default: return 'var(--badge-bg-default)';
      }
    }
  };
  
  const getTextColor = () => {
    if (style === 'solid') {
      switch (variant) {
        case 'brand': return 'var(--badge-text-brand)';
        case 'success': 
        case 'warning': 
        case 'error': return 'var(--color-text-on-primary)';
        default: return 'var(--badge-text-default)';
      }
    } else {
      switch (variant) {
        case 'brand': return 'var(--color-brand-accent)';
        case 'success': return 'var(--color-state-success)';
        case 'warning': return 'var(--color-state-warning)';
        case 'error': return 'var(--color-state-error)';
        default: return 'var(--badge-text-default)';
      }
    }
  };
  
  return (
    <span 
      className={`${baseClasses} ${className}`}
      style={{
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        borderRadius: 'var(--badge-radius)',
        paddingLeft: 'var(--badge-padding-x)',
        paddingRight: 'var(--badge-padding-x)',
        paddingTop: 'var(--badge-padding-y)',
        paddingBottom: 'var(--badge-padding-y)',
        fontSize: 'var(--text-caption-size)',
        lineHeight: 'var(--text-caption-line-height)',
        fontWeight: 'var(--text-caption-weight)'
      }}
    >
      {children}
    </span>
  );
}
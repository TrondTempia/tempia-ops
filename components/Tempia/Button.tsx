import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "shadow-card",
    secondary: "border shadow-card",
    tertiary: "bg-transparent",
    destructive: "shadow-card"
  };
  
  const sizeClasses = {
    sm: "h-8",
    md: "h-10", 
    lg: "h-12"
  };
  
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary': return 'var(--color-brand-primary)';
      case 'secondary': return 'var(--color-bg-subtle)';
      case 'destructive': return 'var(--color-state-error)';
      default: return 'transparent';
    }
  };
  
  const getTextColor = () => {
    switch (variant) {
      case 'primary': return 'var(--color-text-on-primary)';
      case 'secondary': return 'var(--color-text-primary)';
      case 'destructive': return 'var(--color-text-on-primary)';
      default: return 'var(--color-text-primary)';
    }
  };
  
  const getBorderColor = () => {
    switch (variant) {
      case 'secondary': return 'var(--color-border-default)';
      default: return 'transparent';
    }
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      style={{ 
        borderRadius: 'var(--radius-component-sm)',
        paddingLeft: 'var(--space-component-lg)',
        paddingRight: 'var(--space-component-lg)',
        paddingTop: 'var(--space-component-sm)',
        paddingBottom: 'var(--space-component-sm)',
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        borderColor: getBorderColor(),
        fontSize: 'var(--text-body-size)',
        lineHeight: 'var(--text-body-line-height)',
        fontWeight: 'var(--font-weight-medium)'
      }}
      {...props}
    >
      {children}
    </button>
  );
}
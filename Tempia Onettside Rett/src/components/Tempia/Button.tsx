import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
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
    primary: "text-primary-foreground hover:opacity-90 active:opacity-95 focus:ring-primary shadow-card",
    secondary: "text-secondary-foreground border border-border shadow-card hover:opacity-90 active:opacity-95 focus:ring-accent",
    tertiary: "bg-transparent text-foreground focus:ring-accent hover:opacity-90 active:opacity-95",
    destructive: "text-destructive-foreground hover:opacity-90 active:opacity-95 focus:ring-destructive shadow-card"
  };
  
  const sizeClasses = {
    sm: "h-8",
    md: "h-10", 
    lg: "h-12"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      style={{ 
        borderRadius: 'var(--button-radius)',
        paddingLeft: 'var(--button-padding-x)',
        paddingRight: 'var(--button-padding-x)',
        paddingTop: 'var(--button-padding-y)',
        paddingBottom: 'var(--button-padding-y)',
        backgroundColor: variant === 'primary' ? 'var(--button-bg-primary)' :
                        variant === 'secondary' ? 'var(--button-bg-secondary)' :
                        variant === 'destructive' ? 'var(--color-state-error)' :
                        'transparent'
      }}
      {...props}
    >
      {children}
    </button>
  );
}
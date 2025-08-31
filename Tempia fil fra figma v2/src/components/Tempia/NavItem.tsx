import React from 'react';

interface NavItemProps {
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function NavItem({ children, active = false, icon, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 transition-all duration-200 font-medium`}
      style={{ 
        borderRadius: 'var(--radius-component-sm)',
        paddingLeft: 'var(--space-component-md)',
        paddingRight: 'var(--space-component-md)',
        paddingTop: 'var(--space-component-sm)',
        paddingBottom: 'var(--space-component-sm)',
        backgroundColor: active ? 'var(--color-brand-primary)' : 'transparent',
        color: active ? 'var(--color-text-on-primary)' : 'var(--color-text-secondary)',
        boxShadow: active ? 'var(--shadow-card)' : 'none'
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)';
          e.currentTarget.style.color = 'var(--color-text-primary)';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--color-text-secondary)';
        }
      }}
    >
      {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
      <span style={{ fontSize: 'var(--text-body-size)', lineHeight: 'var(--text-body-line-height)' }}>{children}</span>
    </button>
  );
}
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
      className={`w-full flex items-center gap-3 transition-all duration-200 font-medium ${
        active 
          ? 'shadow-card' 
          : 'text-muted-foreground hover:text-foreground active:opacity-95'
      }`}
      style={{ 
        borderRadius: 'var(--nav-item-radius)',
        paddingLeft: 'var(--nav-item-padding-x)',
        paddingRight: 'var(--nav-item-padding-x)',
        paddingTop: 'var(--nav-item-padding-y)',
        paddingBottom: 'var(--nav-item-padding-y)',
        backgroundColor: active ? 'var(--nav-item-bg-active)' : 'transparent',
        color: active ? 'var(--nav-item-text-active)' : undefined
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'var(--nav-item-bg-hover)';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
      <span style={{ fontSize: 'var(--text-body-size)', lineHeight: 'var(--text-body-line-height)' }}>{children}</span>
    </button>
  );
}
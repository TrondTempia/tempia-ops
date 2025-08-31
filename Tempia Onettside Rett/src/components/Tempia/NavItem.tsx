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
      className={`w-full flex items-center gap-3 px-3 py-2 transition-all duration-200 font-medium ${
        active 
          ? 'bg-primary text-primary-foreground shadow-card' 
          : 'text-muted-foreground hover:text-foreground hover:bg-neutral-100 active:bg-neutral-200'
      }`}
      style={{ borderRadius: 'var(--radius-md)' }}
    >
      {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
      <span style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>{children}</span>
    </button>
  );
}
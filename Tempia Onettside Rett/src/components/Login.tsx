import React, { useState } from 'react';
import { Button } from './Tempia/Button';
import backgroundImage from 'figma:asset/613e80f2b0f7983c84f3c490c8567f726dcacd7d.png';
import tempiaLogo from 'figma:asset/6eccd9abc8037b7532df8cba945c4a778aa40634.png';

interface LoginProps {
  onLogin: () => void;
}

// Frame: Login
export function Login({ onLogin }: LoginProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    // Frame: Login
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={backgroundImage.src} 
          alt="Norwegian landscape"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card/95 backdrop-blur-sm shadow-elevated border border-border overflow-hidden" style={{ borderRadius: 'var(--radius-lg)' }}>
          {/* Header */}
          <div className="px-8 py-6 border-b border-border text-center">
            {/* Tempia Logo */}
            <div className="mb-4 flex justify-center">
              <img 
                src={tempiaLogo.src} 
                alt="Tempia Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>Verktøyside for ansatte</p>
          </div>

          {/* Form */}
          <div className="px-8 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block font-medium text-foreground mb-2" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>
                  Passord
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-border focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-input-background"
                  style={{ 
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-body)',
                    lineHeight: 'var(--leading-body)'
                  }}
                  placeholder="Skriv inn ditt passord"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Logg inn
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-primary hover:opacity-80 transition-colors"
                  style={{ fontSize: 'var(--text-small)', lineHeight: 'var(--leading-small)' }}
                >
                  Glemt passord?
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-neutral-50/80 border-t border-border">
            <p className="text-muted-foreground text-center" style={{ fontSize: 'var(--text-caption)', lineHeight: 'var(--leading-caption)' }}>
              © 2025 Tempia. Sikker tilgang til verktøyside for ansatte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

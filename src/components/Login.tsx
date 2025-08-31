import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from './Tempia/Button';
import backgroundImage from '../assets/login-bg.png';
import tempiaLogo from '../assets/tempia-logo.png';

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
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-page)' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={backgroundImage} 
          alt="Norwegian landscape"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div 
          className="backdrop-blur-sm overflow-hidden"
          style={{ 
            backgroundColor: 'var(--color-bg-surface)',
            borderRadius: 'var(--card-radius)',
            border: `1px solid var(--color-border-default)`,
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          {/* Header */}
          <div 
            className="px-8 py-6 text-center"
            style={{ 
              borderBottom: `1px solid var(--color-border-default)`
            }}
          >
            {/* Tempia Logo */}
            <div className="mb-4 flex justify-center">
              <Image 
                src={tempiaLogo} 
                alt="Tempia Logo"
                width={120}
                height={48}
                className="object-contain"
              />
            </div>
            <p 
              style={{ 
                fontSize: 'var(--text-body-size)', 
                lineHeight: 'var(--text-body-line-height)',
                color: 'var(--color-text-secondary)'
              }}
            >
              Verktøyside for ansatte
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="password" 
                  className="block mb-2" 
                  style={{ 
                    fontSize: 'var(--text-body-size)', 
                    lineHeight: 'var(--text-body-line-height)',
                    fontWeight: 'var(--text-body-weight)',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  Passord
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full transition-all focus:outline-none focus:ring-2"
                  style={{ 
                    borderRadius: 'var(--input-radius)',
                    paddingLeft: 'var(--input-padding-x)',
                    paddingRight: 'var(--input-padding-x)',
                    paddingTop: 'var(--input-padding-y)',
                    paddingBottom: 'var(--input-padding-y)',
                    backgroundColor: 'var(--input-bg)',
                    border: `1px solid var(--input-border)`,
                    fontSize: 'var(--text-body-size)',
                    lineHeight: 'var(--text-body-line-height)',
                    color: 'var(--color-text-primary)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--input-border-focus)';
                    e.target.style.boxShadow = `0 0 0 2px var(--color-interactive-focus)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--input-border)';
                    e.target.style.boxShadow = 'none';
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
                  className="transition-colors hover:opacity-80"
                  style={{ 
                    fontSize: 'var(--text-small-size)', 
                    lineHeight: 'var(--text-small-line-height)',
                    color: 'var(--color-brand-accent)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Glemt passord?
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div 
            className="px-8 py-4"
            style={{ 
              backgroundColor: 'var(--color-bg-subtle)',
              borderTop: `1px solid var(--color-border-default)`
            }}
          >
            <p 
              className="text-center" 
              style={{ 
                fontSize: 'var(--text-caption-size)', 
                lineHeight: 'var(--text-caption-line-height)',
                color: 'var(--color-text-secondary)'
              }}
            >
              © 2025 Tempia. Sikker tilgang til verktøyside for ansatte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

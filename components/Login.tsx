import React, { useState } from 'react';
import backgroundImage from 'figma:asset/613e80f2b0f7983c84f3c490c8567f726dcacd7d.png';
import secondaryBackgroundImage from 'figma:asset/d19e8327c0a83cb4d14ec31f2a0626f7e01b0e8e.png';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image - Upper 1/3 */}
      <div 
        className="absolute inset-0 w-full h-1/3 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      
      {/* Black Background - Lower 2/3 */}
      <div className="absolute inset-0 top-1/3 w-full h-2/3 bg-black" />
      
      {/* Secondary Background Image - Behind login portal */}
      <div 
        className="absolute inset-0 w-full h-full bg-contain bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url(${secondaryBackgroundImage})`,
          backgroundPosition: 'center bottom',
        }}
      />
      
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Login Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div 
            className="rounded-lg shadow-elevated overflow-hidden backdrop-blur-sm border"
            style={{ 
              backgroundColor: 'var(--color-login-primary)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Header */}
            <div className="px-8 py-6 border-b text-center" style={{ borderColor: 'rgba(26, 46, 32, 0.1)' }}>
              {/* Logo */}
              <div className="mb-4 flex justify-center">
                <div 
                  className="h-12 w-32 rounded flex items-center justify-center"
                  style={{ 
                    backgroundColor: 'var(--color-login-button)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <span className="font-bold text-lg" style={{ color: 'var(--color-login-button-foreground)' }}>TEMPIA</span>
                </div>
              </div>
              <p style={{ color: 'var(--color-login-primary-foreground)', opacity: 0.7 }}>Verktøyside for ansatte</p>
            </div>

            {/* Form */}
            <div className="px-8 py-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="password" 
                    className="block font-medium mb-2"
                    style={{ color: 'var(--color-login-primary-foreground)' }}
                  >
                    Passord
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-md transition-all border"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderColor: 'rgba(26, 46, 32, 0.2)',
                      color: '#1a2e20',
                    }}
                    placeholder="Skriv inn ditt passord"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-md font-medium transition-colors focus:outline-none shadow-card"
                  style={{
                    backgroundColor: 'var(--color-login-button)',
                    color: 'var(--color-login-button-foreground)',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.opacity = '1';
                  }}
                >
                  Logg inn
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm transition-colors"
                    style={{ color: 'var(--color-login-primary-foreground)', opacity: 0.8 }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLButtonElement).style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLButtonElement).style.opacity = '0.8';
                    }}
                  >
                    Glemt passord?
                  </button>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div 
              className="px-8 py-4 border-t"
              style={{ 
                backgroundColor: 'rgba(26, 46, 32, 0.05)',
                borderColor: 'rgba(26, 46, 32, 0.1)',
              }}
            >
              <p 
                className="text-center text-sm"
                style={{ color: 'var(--color-login-primary-foreground)', opacity: 0.7 }}
              >
                © 2025 Tempia. Sikker tilgang til verktøyside for ansatte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
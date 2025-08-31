import React, { useState } from 'react';
import Image from 'next/image';

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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src="https://images.unsplash.com/photo-1708058849405-9383155ff3d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1waWElMjBsb2dvJTIwbWluaW1hbHxlbnwxfHx8fDE3NTY2NDc4NzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Norwegian landscape background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-card/95 backdrop-blur-sm shadow-elevated border border-border overflow-hidden rounded-lg">
          {/* Header */}
          <div className="px-8 py-6 border-b border-border text-center">
            {/* Logo */}
            <div className="mb-4 flex justify-center">
              <div 
                className="h-12 w-32 bg-primary rounded flex items-center justify-center"
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                <span className="text-primary-foreground font-bold text-lg">TEMPIA</span>
              </div>
            </div>
            <p className="text-muted-foreground">Verktøyside for ansatte</p>
          </div>

          {/* Form */}
          <div className="px-8 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="password" 
                  className="block font-medium text-foreground mb-2"
                >
                  Passord
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-transparent transition-all bg-input-background text-foreground"
                  placeholder="Skriv inn ditt passord"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-md font-medium hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-card"
              >
                Logg inn
              </button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-accent hover:opacity-80 transition-colors text-sm"
                >
                  Glemt passord?
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-muted/50 border-t border-border">
            <p className="text-muted-foreground text-center text-sm">
              © 2025 Tempia. Sikker tilgang til verktøyside for ansatte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
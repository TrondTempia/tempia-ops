// src/components/Login.tsx
import { useState } from 'react';
import { Button } from './Tempia/Button';
import tempiaLogo from '../assets/tempia-logo.png';
import loginBg from '../assets/login-bg.png';

export function Login({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: koble til Supabase auth her
    onSuccess();
  };

  return (
    <div className="relative min-h-screen">
      {/* Bakgrunnsbilde */}
      <img
        src={loginBg}
        alt="Norwegian landscape"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Kort */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-sm bg-card border border-border p-6 shadow-card"
             style={{ borderRadius: 'var(--radius-component-lg)' }}>
          <div className="mb-4 flex justify-center">
            <img src={tempiaLogo} alt="Tempia" className="h-12 w-auto object-contain" />
          </div>

          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="block mb-1 text-sm text-muted-foreground">E-post</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-background border border-border px-3 py-2"
                style={{ borderRadius: 'var(--radius-component-sm)' }}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-muted-foreground">Passord</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-background border border-border px-3 py-2"
                style={{ borderRadius: 'var(--radius-component-sm)' }}
              />
            </div>

            <Button variant="primary" className="w-full mt-2" type="submit">
              Logg inn
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

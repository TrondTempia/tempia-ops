import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signIn(email, password);
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Feil ved innlogging");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg shadow-elevated overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-border text-center">
            <div className="mb-4 flex justify-center">
              <div 
                className="h-12 w-32 bg-primary rounded flex items-center justify-center"
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                <span className="text-primary-foreground font-bold text-lg">TEMPIA</span>
              </div>
            </div>
            <h1 className="text-xl font-semibold text-foreground mb-2">Logg inn</h1>
            <p className="text-muted-foreground">Tilgang til Tempia Ops dashboard</p>
          </div>

          {/* Form */}
          <div className="px-8 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block font-medium text-foreground mb-2">
                  E-post
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-transparent transition-all bg-input text-foreground"
                  placeholder="din@epost.no"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block font-medium text-foreground mb-2">
                  Passord
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-transparent transition-all bg-input text-foreground"
                  placeholder="Skriv inn ditt passord"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-md font-medium hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-card disabled:opacity-50"
              >
                {loading ? "Logger inn..." : "Logg inn"}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-muted/50 border-t border-border">
            <p className="text-muted-foreground text-center text-sm">
              © 2025 Tempia. Sikker tilgang til ops dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
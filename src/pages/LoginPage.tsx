import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../lib/auth";

// Background image
const backgroundImage = "https://images.unsplash.com/photo-1745390468917-acb918ef08a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbmR1c3RyaWFsJTIwYnVpbGRpbmclMjBmYWNhZGV8ZW58MXx8fHwxNzU2NjY1MDU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

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
              <h1 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-login-primary-foreground)' }}>Logg inn</h1>
              <p style={{ color: 'var(--color-login-primary-foreground)', opacity: 0.7 }}>Tilgang til Tempia Ops dashboard</p>
            </div>

            {/* Form */}
            <div className="px-8 py-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div 
                    className="px-4 py-3 rounded-md text-sm border"
                    style={{ 
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      borderColor: 'rgba(239, 68, 68, 0.3)',
                      color: '#dc2626',
                    }}
                  >
                    {error}
                  </div>
                )}

                <div>
                  <label 
                    htmlFor="email" 
                    className="block font-medium mb-2"
                    style={{ color: 'var(--color-login-primary-foreground)' }}
                  >
                    E-post
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-md transition-all border"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderColor: 'rgba(26, 46, 32, 0.2)',
                      color: '#1a2e20',
                    }}
                    placeholder="din@epost.no"
                    required
                    disabled={loading}
                  />
                </div>

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
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-md font-medium transition-colors focus:outline-none shadow-card disabled:opacity-50"
                  style={{
                    backgroundColor: 'var(--color-login-button)',
                    color: 'var(--color-login-button-foreground)',
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      (e.target as HTMLButtonElement).style.opacity = '0.9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.opacity = '1';
                  }}
                >
                  {loading ? "Logger inn..." : "Logg inn"}
                </button>
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
                © 2025 Tempia. Sikker tilgang til ops dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
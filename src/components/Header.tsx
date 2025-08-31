import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, Building, FileText } from "lucide-react";
import { signOut } from "../lib/auth";

interface HeaderProps {
  userRole?: "admin" | "viewer";
}

export default function Header({ userRole }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card border-b border-border h-16">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-8">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center">
            <div 
              className="h-8 w-24 bg-primary rounded flex items-center justify-center"
              style={{ borderRadius: 'var(--radius-sm)' }}
            >
              <span className="text-primary-foreground font-bold text-sm">TEMPIA</span>
            </div>
          </Link>
          
          {/* Navigation */}
          <nav className="flex gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-medium text-sm ${
                isActive("/")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Building className="w-4 h-4" />
              Bygg
            </Link>
            <Link
              to="/procedures"
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-medium text-sm ${
                isActive("/procedures")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <FileText className="w-4 h-4" />
              Prosedyrer
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {userRole === "admin" ? "Administrator" : "Viewer"}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors font-medium text-sm rounded-md"
          >
            <LogOut className="w-4 h-4" />
            Logg ut
          </button>
        </div>
      </div>
    </header>
  );
}

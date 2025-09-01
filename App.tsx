import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import BrandGuide from "./components/BrandGuide";
// Temporarily comment out supabase to isolate the issue
// import { auth } from "./lib/supabase";
import "./styles/globals.css";

export default function App() {
  const [currentView, setCurrentView] = useState<
    "login" | "dashboard" | "brand-guide"
  >("login");
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Check for existing session on app load
  useEffect(() => {
    // Temporary simplified version without Supabase
    const checkSession = async () => {
      try {
        // Simulate session check
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For now, just set to not loading after delay
        setIsLoading(false);
      } catch (error) {
        console.error('Session check error:', error);
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Add keyboard shortcut to access Brand Guide (Ctrl/Cmd + B)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        setCurrentView(
          currentView === "brand-guide"
            ? "dashboard"
            : "brand-guide",
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [currentView]);

  const handleLogin = async () => {
    try {
      // Temporary simplified version
      setUserRole('admin');
      setCurrentView("dashboard");
    } catch (error) {
      console.error('Role fetch error:', error);
      setCurrentView("dashboard"); // Fallback
    }
  };

  const handleLogout = async () => {
    try {
      // Temporary simplified version
      setUserRole(null);
      setCurrentView("login");
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout anyway
      setUserRole(null);
      setCurrentView("login");
    }
  };

  // Show loading spinner while checking session
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Frame: Login
  if (currentView === "login") {
    return <Login onLogin={handleLogin} />;
  }

  // Frame: Brand Guide
  if (currentView === "brand-guide") {
    return <BrandGuide />;
  }

  // Frame: Dashboard
  return <Dashboard onLogout={handleLogout} />;
}
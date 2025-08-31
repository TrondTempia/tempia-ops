import React, { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { BrandGuide } from "./components/BrandGuide";

export default function App() {
  const [currentView, setCurrentView] = useState<
    "login" | "dashboard" | "brand-guide"
  >("login");

  const handleLogin = () => {
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setCurrentView("login");
  };

  // Add keyboard shortcut to access Brand Guide (Ctrl/Cmd + B)
  React.useEffect(() => {
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
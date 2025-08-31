import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ⬇️ Viktig: bruk globals.css (med @tailwind base/components/utilities øverst)
import "../styles/globals.css";

import LoginPage from "./pages/LoginPage";
import BuildingsList from "./pages/BuildingsList";
import BuildingDetail from "./pages/BuildingDetail";
import ProceduresPage from "./pages/ProceduresPage";
import FlowViewer from "./pages/FlowViewer";
import FlowEditor from "./pages/FlowEditor";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <BuildingsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bygg/:number"
          element={
            <ProtectedRoute>
              <BuildingDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/procedures"
          element={
            <ProtectedRoute>
              <ProceduresPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bygg/:number/flow/:flowId"
          element={
            <ProtectedRoute>
              <FlowViewer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bygg/:number/flow/:flowId/edit"
          element={
            <ProtectedRoute adminOnly>
              <FlowEditor />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to login */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

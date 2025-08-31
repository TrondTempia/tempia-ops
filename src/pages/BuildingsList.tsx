import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building, Plus, Edit } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { getCurrentUser, getUserRole } from "../lib/auth";
import Header from "../components/Header";

interface Building {
  id: string;
  number: number;
  name: string | null;
  address: string | null;
  created_at: string;
}

export default function BuildingsList() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<"admin" | "viewer">("viewer");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", address: "" });

  useEffect(() => {
    fetchBuildings();
    checkUserRole();
  }, []);

  const checkUserRole = async () => {
    const user = await getCurrentUser();
    setUserRole(getUserRole(user));
  };

  const fetchBuildings = async () => {
    try {
      const { data, error } = await supabase
        .from("buildings")
        .select("*")
        .order("number", { ascending: true });

      if (error) throw error;
      setBuildings(data || []);
    } catch (error) {
      console.error("Error fetching buildings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (building: Building) => {
    setEditingId(building.id);
    setEditForm({
      name: building.name || "",
      address: building.address || "",
    });
  };

  const handleSave = async (id: string) => {
    try {
      const { error } = await supabase
        .from("buildings")
        .update({
          name: editForm.name || null,
          address: editForm.address || null,
        })
        .eq("id", id);

      if (error) throw error;

      setEditingId(null);
      await fetchBuildings();
    } catch (error) {
      console.error("Error updating building:", error);
      alert("Feil ved oppdatering av bygg");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ name: "", address: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole={userRole} />
        <div className="max-w-7xl mx-auto p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} />
      
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Bygg</h1>
          <div className="text-sm text-muted-foreground">
            {buildings.length} av {130 - 40 + 1} bygg
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {buildings.map((building) => (
            <div
              key={building.id}
              className="bg-card border border-border rounded-lg shadow-card hover:shadow-elevated transition-shadow overflow-hidden"
            >
              {editingId === building.id ? (
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Building className="w-5 h-5 text-primary" />
                    <span className="font-bold text-lg text-foreground">
                      Bygg {building.number}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Navn
                      </label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-md text-sm bg-input text-foreground"
                        placeholder="Byggnavn"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Adresse
                      </label>
                      <input
                        type="text"
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-md text-sm bg-input text-foreground"
                        placeholder="Adresse"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(building.id)}
                        className="flex-1 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-colors"
                      >
                        Lagre
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 bg-secondary text-secondary-foreground px-3 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-colors"
                      >
                        Avbryt
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    to={`/bygg/${building.number}`}
                    className="block p-6 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Building className="w-5 h-5 text-primary" />
                      <span className="font-bold text-lg text-foreground">
                        Bygg {building.number}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-muted-foreground">Navn:</span>
                        <p className="text-foreground">
                          {building.name || "Ikke angitt"}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-sm text-muted-foreground">Adresse:</span>
                        <p className="text-foreground text-sm">
                          {building.address || "Ikke angitt"}
                        </p>
                      </div>
                    </div>
                  </Link>
                  
                  {userRole === "admin" && (
                    <div className="px-6 py-3 border-t border-border bg-muted/30">
                      <button
                        onClick={() => handleEdit(building)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Rediger
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
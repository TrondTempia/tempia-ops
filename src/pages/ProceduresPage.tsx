import React, { useState, useEffect } from "react";
import { Plus, ExternalLink, Edit, Trash2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { getCurrentUser, getUserRole } from "../lib/auth";
import Header from "../components/Header";

interface Procedure {
  id: string;
  code: string | null;
  title: string;
  link: string;
  created_at: string;
}

export default function ProceduresPage() {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<"admin" | "viewer">("viewer");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    link: "",
  });

  useEffect(() => {
    fetchProcedures();
    checkUserRole();
  }, []);

  const checkUserRole = async () => {
    const user = await getCurrentUser();
    setUserRole(getUserRole(user));
  };

  const fetchProcedures = async () => {
    try {
      const { data, error } = await supabase
        .from("procedures")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProcedures(data || []);
    } catch (error) {
      console.error("Error fetching procedures:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ code: "", title: "", link: "" });
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.link.trim()) {
      alert("Tittel og lenke er påkrevd");
      return;
    }

    try {
      if (editingId) {
        // Update existing procedure
        const { error } = await supabase
          .from("procedures")
          .update({
            code: formData.code.trim() || null,
            title: formData.title.trim(),
            link: formData.link.trim(),
          })
          .eq("id", editingId);

        if (error) throw error;
      } else {
        // Create new procedure
        const { error } = await supabase
          .from("procedures")
          .insert({
            code: formData.code.trim() || null,
            title: formData.title.trim(),
            link: formData.link.trim(),
          });

        if (error) throw error;
      }

      resetForm();
      await fetchProcedures();
    } catch (error) {
      console.error("Error saving procedure:", error);
      alert("Feil ved lagring av prosedyre");
    }
  };

  const handleEdit = (procedure: Procedure) => {
    setFormData({
      code: procedure.code || "",
      title: procedure.title,
      link: procedure.link,
    });
    setEditingId(procedure.id);
    setShowAddForm(true);
  };

  const handleDelete = async (procedure: Procedure) => {
    if (!confirm(`Er du sikker på at du vil slette "${procedure.title}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("procedures")
        .delete()
        .eq("id", procedure.id);

      if (error) throw error;

      await fetchProcedures();
    } catch (error) {
      console.error("Error deleting procedure:", error);
      alert("Feil ved sletting av prosedyre");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole={userRole} />
        <div className="max-w-7xl mx-auto p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded-lg"></div>
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
          <h1 className="text-3xl font-bold text-foreground">Prosedyrer</h1>
          {userRole === "admin" && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ny prosedyre
            </button>
          )}
        </div>

        {/* Add/Edit Form */}
        {showAddForm && userRole === "admin" && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-foreground mb-4">
              {editingId ? "Rediger prosedyre" : "Legg til ny prosedyre"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-foreground mb-2">
                    Kode (valgfritt)
                  </label>
                  <input
                    type="text"
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground"
                    placeholder="F.eks. BR-001"
                  />
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                    Tittel *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground"
                    placeholder="Prosedyre tittel"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="link" className="block text-sm font-medium text-foreground mb-2">
                  Lenke *
                </label>
                <input
                  type="url"
                  id="link"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground"
                  placeholder="https://..."
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-colors"
                >
                  {editingId ? "Oppdater" : "Legg til"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-colors"
                >
                  Avbryt
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Procedures List */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {procedures.length === 0 ? (
            <div className="text-center text-muted-foreground py-16">
              <p className="text-lg mb-2">Ingen prosedyrer lagt til ennå</p>
              {userRole === "admin" && (
                <p className="text-sm">Bruk "Ny prosedyre" knappen for å legge til den første prosedyren</p>
              )}
            </div>
          ) : (
            <div className="overflow-hidden rounded-md border border-border">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Kode</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Tittel</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Opprettet</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Handlinger</th>
                  </tr>
                </thead>
                <tbody>
                  {procedures.map((procedure) => (
                    <tr key={procedure.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <span className="text-sm text-muted-foreground">
                          {procedure.code || "—"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-foreground">
                          {procedure.title}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-muted-foreground">
                          {new Date(procedure.created_at).toLocaleDateString("no-NO")}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <a
                            href={procedure.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm font-medium hover:opacity-90 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Åpne
                          </a>
                          {userRole === "admin" && (
                            <>
                              <button
                                onClick={() => handleEdit(procedure)}
                                className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium hover:opacity-90 transition-colors"
                              >
                                <Edit className="w-3 h-3" />
                                Rediger
                              </button>
                              <button
                                onClick={() => handleDelete(procedure)}
                                className="flex items-center gap-1 bg-destructive text-destructive-foreground px-3 py-1 rounded-md text-sm font-medium hover:opacity-90 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                                Slett
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
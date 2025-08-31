// src/pages/BuildingsList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building as BuildingIcon, Plus } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { getCurrentUser, getUserRole } from "../lib/auth";
import Header from "../components/Header";

interface BuildingData {
  id: string;
  number: number;
  name: string | null;
  address: string | null;
  created_at: string;
}

export default function BuildingsList() {
  const [buildings, setBuildings] = useState<BuildingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [userRole, setUserRole] = useState<"admin" | "viewer">("viewer");

  useEffect(() => {
    const init = async () => {
      await resolveRole();
      await fetchBuildings();
      setLoading(false);
    };
    init();
  }, []);

  const resolveRole = async () => {
    const user = await getCurrentUser();
    setUserRole(getUserRole(user));
  };

  const fetchBuildings = async () => {
    const { data, error } = await supabase
      .from("buildings")
      .select("*")
      .order("number", { ascending: true })
      .returns<BuildingData[]>();

    if (error) {
      console.error("Feil ved henting av bygg:", error);
      return;
    }
    setBuildings(data ?? []);
  };

  const createBuilding = async () => {
    // Kun admin kan opprette
    if (userRole !== "admin") return;

    const numberInput = prompt("Byggnummer (f.eks. 40):");
    if (!numberInput) return;
    const parsed = parseInt(numberInput, 10);
    if (Number.isNaN(parsed)) {
      alert("Ugyldig byggnummer");
      return;
    }

    const nameInput = prompt("Navn (valgfritt):") ?? null;
    const addressInput = prompt("Adresse (valgfritt):") ?? null;

    const { data, error } = await supabase
      .from("buildings")
      .insert({ number: parsed, name: nameInput, address: addressInput })
      .select()
      .single()
      .returns<BuildingData>();

    if (error) {
      console.error("Feil ved opprettelse av bygg:", error);
      alert("Klarte ikke opprette bygg.");
      return;
    }

    // legg til i lokal state og hold sortering på nummer
    setBuildings((prev) =>
      [...prev, data].sort((a, b) => a.number - b.number)
    );
  };

  const filtered = buildings.filter((b) => {
    const q = filter.trim().toLowerCase();
    if (!q) return true;
    const hay = `${b.number} ${b.name ?? ""} ${b.address ?? ""}`.toLowerCase();
    return hay.includes(q);
  });

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} />

      <div className="max-w-7xl mx-auto p-8">
        {/* Topp-linje */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Bygg</h1>
            <p className="text-muted-foreground">
              Velg et bygg for å se FDV og prosessflyt
            </p>
          </div>

          <div className="flex gap-3">
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-10 px-3 border border-border bg-card text-foreground rounded-md outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Søk på nummer, navn eller adresse…"
            />
            {userRole === "admin" && (
              <button
                onClick={createBuilding}
                className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
              >
                <Plus className="w-4 h-4" />
                Nytt bygg
              </button>
            )}
          </div>
        </div>

        {/* Innhold */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-28 bg-muted rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            Ingen bygg matcher søket.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((building: BuildingData) => (
              <Link
                key={building.id}
                to={`/bygg/${building.number}`}
                className="group border border-border rounded-lg p-5 bg-card hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <BuildingIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-foreground">
                        Bygg {building.number}
                      </h2>
                      <span className="text-sm text-muted-foreground">
                        {new Date(building.created_at).toLocaleDateString("no-NO")}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      {building.name ?? "Navn ikke angitt"}
                    </p>
                    {building.address && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {building.address}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

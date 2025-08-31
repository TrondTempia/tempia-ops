import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { Building, ArrowLeft, GitBranch, Edit } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { getCurrentUser, getUserRole } from "../lib/auth";
import Header from "../components/Header";
import FdvUploadList from "../components/FdvUploadList";

interface BuildingData {
  id: string;
  number: number;
  name: string | null;
  address: string | null;
  created_at: string;
}

interface Flow {
  id: string;
  building_id: string;
  title: string;
  created_by: string | null;
  created_at: string;
}

export default function BuildingDetail() {
  const { number } = useParams<{ number: string }>();
  const [building, setBuilding] = useState<BuildingData | null>(null);
  const [flows, setFlows] = useState<Flow[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<"admin" | "viewer">("viewer");

  useEffect(() => {
    if (number) {
      fetchBuilding();
      checkUserRole();
    }
  }, [number]);

  const checkUserRole = async () => {
    const user = await getCurrentUser();
    setUserRole(getUserRole(user));
  };

  const fetchBuilding = async () => {
    try {
      const buildingNumber = parseInt(number!);
      
      // Get building data
      const { data: buildingData, error: buildingError } = await supabase
        .from("buildings")
        .select("*")
        .eq("number", buildingNumber)
        .single();

      if (buildingError) throw buildingError;
      setBuilding(buildingData);

      // Get flows for this building
      const { data: flowsData, error: flowsError } = await supabase
        .from("flows")
        .select("*")
        .eq("building_id", buildingData.id)
        .order("created_at", { ascending: false });

      if (flowsError) throw flowsError;
      setFlows(flowsData || []);

    } catch (error) {
      console.error("Error fetching building:", error);
    } finally {
      setLoading(false);
    }
  };

  const createNewFlow = async () => {
    if (!building) return;

    const title = prompt("Navn på ny prosessflyt:");
    if (!title) return;

    try {
      const { data, error } = await supabase
        .from("flows")
        .insert({
          building_id: building.id,
          title: title,
        })
        .select()
        .single();

      if (error) throw error;

      // Add to local state
      setFlows([data, ...flows]);
    } catch (error) {
      console.error("Error creating flow:", error);
      alert("Feil ved opprettelse av prosessflyt");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole={userRole} />
        <div className="max-w-7xl mx-auto p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-64 bg-muted rounded-lg"></div>
              <div className="h-64 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!building) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole={userRole} />
        <div className="max-w-7xl mx-auto p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Bygg ikke funnet</h1>
            <Link
              to="/"
              className="text-primary hover:opacity-80 transition-colors"
            >
              Tilbake til byggliste
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} />
      
      <div className="max-w-7xl mx-auto p-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake til byggliste
          </Link>
        </div>

        {/* Building Header */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Building className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Bygg {building.number}
                </h1>
                <p className="text-muted-foreground">
                  {building.name || "Navn ikke angitt"}
                </p>
                {building.address && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {building.address}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FDV Files */}
          <div className="space-y-6">
            <FdvUploadList buildingId={building.id} />
          </div>

          {/* Process Flows */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Prosessflyt</h3>
                  {userRole === "admin" && (
                    <button
                      onClick={createNewFlow}
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-colors"
                    >
                      <GitBranch className="w-4 h-4" />
                      Ny flyt
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                {flows.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <GitBranch className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Ingen prosessflyt opprettet ennå</p>
                    {userRole === "admin" && (
                      <p className="text-sm mt-2">Bruk "Ny flyt" knappen for å opprette en prosessflyt</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {flows.map((flow) => (
                      <div
                        key={flow.id}
                        className="border border-border rounded-md p-4 hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">{flow.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Opprettet {new Date(flow.created_at).toLocaleDateString("no-NO")}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Link
                              to={`/bygg/${building.number}/flow/${flow.id}`}
                              className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm font-medium hover:opacity-90 transition-colors"
                            >
                              Vis flyt
                            </Link>
                            {userRole === "admin" && (
                              <Link
                                to={`/bygg/${building.number}/flow/${flow.id}/edit`}
                                className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium hover:opacity-90 transition-colors"
                              >
                                <Edit className="w-3 h-3" />
                                Rediger
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Upload, FileText, Trash2, Download } from "lucide-react";

interface FdvFile {
  id: string;
  building_id: string;
  file_name: string;
  uploaded_at: string;
  version: number;
}

interface FdvUploadListProps {
  buildingId?: string;
}

export default function FdvUploadList({ buildingId = "40" }: FdvUploadListProps) {
  const [files] = useState<FdvFile[]>([
    {
      id: "1",
      building_id: "40",
      file_name: "Driftsmanual_Bygg40.pdf",
      uploaded_at: "2025-08-28T10:00:00Z",
      version: 1,
    },
    {
      id: "2", 
      building_id: "40",
      file_name: "Vedlikeholdsplan_Bygg40.pdf",
      uploaded_at: "2025-08-25T14:30:00Z",
      version: 2,
    },
    {
      id: "3",
      building_id: "40", 
      file_name: "FDV_Komplett_Bygg40.pdf",
      uploaded_at: "2025-08-20T09:15:00Z",
      version: 1,
    },
  ]);
  const [uploading, setUploading] = useState(false);
  const userRole = "admin"; // Simplified for now

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Kun PDF-filer er tillatt");
      return;
    }

    setUploading(true);
    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`Fil "${file.name}" ble lastet opp!`);
      event.target.value = "";
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Feil ved opplasting av fil");
    } finally {
      setUploading(false);
    }
  };

  const handleFileOpen = async (file: FdvFile) => {
    try {
      // Simulate opening file
      alert(`Åpner "${file.file_name}"`);
    } catch (error) {
      console.error("Error opening file:", error);
      alert("Feil ved åpning av fil");
    }
  };

  const handleFileDelete = async (file: FdvFile) => {
    if (!confirm(`Er du sikker på at du vil slette "${file.file_name}"?`)) {
      return;
    }

    try {
      // Simulate delete
      alert(`Fil "${file.file_name}" ble slettet!`);
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Feil ved sletting av fil");
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">FDV Dokumenter - Bygg {buildingId}</h3>
          {userRole === "admin" && (
            <label className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-colors cursor-pointer">
              <Upload className="w-4 h-4" />
              {uploading ? "Laster opp..." : "Last opp PDF"}
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div className="p-6">
        {files.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Ingen FDV-dokumenter lastet opp ennå</p>
            {userRole === "admin" && (
              <p className="text-sm mt-2">Bruk "Last opp PDF" knappen for å legge til dokumenter</p>
            )}
          </div>
        ) : (
          <div className="overflow-hidden rounded-md border border-border">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Filnavn</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Lastet opp</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Handlinger</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-destructive" />
                        <span className="font-medium text-foreground text-sm">{file.file_name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-muted-foreground text-sm">
                        {new Date(file.uploaded_at).toLocaleDateString("no-NO")}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleFileOpen(file)}
                          className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm font-medium hover:opacity-90 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          Åpne
                        </button>
                        {userRole === "admin" && (
                          <button
                            onClick={() => handleFileDelete(file)}
                            className="flex items-center gap-1 bg-destructive text-destructive-foreground px-3 py-1 rounded-md text-sm font-medium hover:opacity-90 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            Slett
                          </button>
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
  );
}
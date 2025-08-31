import React, { useState, useEffect } from "react";
import { Upload, FileText, Trash2, Download } from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { getUserRole, getCurrentUser } from "../lib/auth";

interface FdvFile {
  id: string;
  building_id: string;
  file_name: string;
  storage_path: string;
  uploaded_by: string | null;
  uploaded_at: string;
  version: number;
  tags: string[] | null;
}

interface FdvUploadListProps {
  buildingId: string;
}

export default function FdvUploadList({ buildingId }: FdvUploadListProps) {
  const [files, setFiles] = useState<FdvFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "viewer">("viewer");

  useEffect(() => {
    fetchFiles();
    checkUserRole();
  }, [buildingId]);

  const checkUserRole = async () => {
    const user = await getCurrentUser();
    setUserRole(getUserRole(user));
  };

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .from("fdv_files")
        .select("*")
        .eq("building_id", buildingId)
        .order("uploaded_at", { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Kun PDF-filer er tillatt");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${buildingId}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("fdv")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save metadata to database
      const { error: dbError } = await supabase
        .from("fdv_files")
        .insert({
          building_id: buildingId,
          file_name: file.name,
          storage_path: filePath,
        });

      if (dbError) throw dbError;

      // Refresh file list
      await fetchFiles();
      
      // Reset input
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
      const { data, error } = await supabase.storage
        .from("fdv")
        .createSignedUrl(file.storage_path, 3600); // 1 hour expiry

      if (error) throw error;
      
      if (data?.signedUrl) {
        window.open(data.signedUrl, "_blank");
      }
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
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("fdv")
        .remove([file.storage_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("fdv_files")
        .delete()
        .eq("id", file.id);

      if (dbError) throw dbError;

      // Refresh file list
      await fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Feil ved sletting av fil");
    }
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">FDV Dokumenter</h3>
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
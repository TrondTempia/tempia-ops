import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export type Database = {
  public: {
    Tables: {
      buildings: {
        Row: {
          id: string;
          number: number;
          name: string | null;
          address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          number: number;
          name?: string | null;
          address?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          number?: number;
          name?: string | null;
          address?: string | null;
          created_at?: string;
        };
      };
      procedures: {
        Row: {
          id: string;
          code: string | null;
          title: string;
          link: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          code?: string | null;
          title: string;
          link: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string | null;
          title?: string;
          link?: string;
          created_at?: string;
        };
      };
      fdv_files: {
        Row: {
          id: string;
          building_id: string;
          file_name: string;
          storage_path: string;
          uploaded_by: string | null;
          uploaded_at: string;
          version: number;
          tags: string[] | null;
        };
        Insert: {
          id?: string;
          building_id: string;
          file_name: string;
          storage_path: string;
          uploaded_by?: string | null;
          uploaded_at?: string;
          version?: number;
          tags?: string[] | null;
        };
        Update: {
          id?: string;
          building_id?: string;
          file_name?: string;
          storage_path?: string;
          uploaded_by?: string | null;
          uploaded_at?: string;
          version?: number;
          tags?: string[] | null;
        };
      };
      flows: {
        Row: {
          id: string;
          building_id: string;
          title: string;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          building_id: string;
          title: string;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          building_id?: string;
          title?: string;
          created_by?: string | null;
          created_at?: string;
        };
      };
      flow_nodes: {
        Row: {
          id: string;
          flow_id: string;
          label: string;
          type: "start" | "step" | "decision" | "end";
          procedure_id: string | null;
          x: number;
          y: number;
        };
        Insert: {
          id?: string;
          flow_id: string;
          label: string;
          type?: "start" | "step" | "decision" | "end";
          procedure_id?: string | null;
          x?: number;
          y?: number;
        };
        Update: {
          id?: string;
          flow_id?: string;
          label?: string;
          type?: "start" | "step" | "decision" | "end";
          procedure_id?: string | null;
          x?: number;
          y?: number;
        };
      };
      flow_edges: {
        Row: {
          id: string;
          flow_id: string;
          source: string;
          target: string;
        };
        Insert: {
          id?: string;
          flow_id: string;
          source: string;
          target: string;
        };
        Update: {
          id?: string;
          flow_id?: string;
          source?: string;
          target?: string;
        };
      };
    };
  };
};
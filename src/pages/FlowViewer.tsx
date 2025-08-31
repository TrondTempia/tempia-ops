import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Edit } from "lucide-react";
import ReactFlow, {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import { supabase } from "../lib/supabaseClient";
import { getCurrentUser, getUserRole } from "../lib/auth";
import Header from "../components/Header";

interface FlowData {
  id: string;
  building_id: string;
  title: string;
  created_by: string | null;
  created_at: string;
}

interface FlowNode {
  id: string;
  flow_id: string;
  label: string;
  type: "start" | "step" | "decision" | "end";
  procedure_id: string | null;
  x: number;
  y: number;
}

interface FlowEdge {
  id: string;
  flow_id: string;
  source: string;
  target: string;
}

interface Procedure {
  id: string;
  title: string;
  link: string;
}

export default function FlowViewer() {
  const { number, flowId } = useParams<{ number: string; flowId: string }>();
  const [flow, setFlow] = useState<FlowData | null>(null);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<"admin" | "viewer">("viewer");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (flowId) {
      fetchFlow();
      fetchProcedures();
      checkUserRole();
    }
  }, [flowId]);

  const checkUserRole = async () => {
    const user = await getCurrentUser();
    setUserRole(getUserRole(user));
  };

  const fetchProcedures = async () => {
    try {
      const { data, error } = await supabase
        .from("procedures")
        .select("id, title, link");

      if (error) throw error;
      setProcedures(data || []);
    } catch (error) {
      console.error("Error fetching procedures:", error);
    }
  };

  const fetchFlow = async () => {
    try {
      // Get flow data
      const { data: flowData, error: flowError } = await supabase
        .from("flows")
        .select("*")
        .eq("id", flowId!)
        .single();

      if (flowError) throw flowError;
      setFlow(flowData);

      // Get flow nodes
      const { data: nodesData, error: nodesError } = await supabase
        .from("flow_nodes")
        .select("*")
        .eq("flow_id", flowId!);

      if (nodesError) throw nodesError;

      // Get flow edges
      const { data: edgesData, error: edgesError } = await supabase
        .from("flow_edges")
        .select("*")
        .eq("flow_id", flowId!);

      if (edgesError) throw edgesError;

      // Convert to ReactFlow format
      const reactFlowNodes: Node[] = (nodesData || []).map((node: FlowNode) => ({
        id: node.id,
        type: node.type,
        position: { x: node.x, y: node.y },
        data: { 
          label: node.label,
          procedureId: node.procedure_id,
        },
      }));

      const reactFlowEdges: Edge[] = (edgesData || []).map((edge: FlowEdge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
      }));

      setNodes(reactFlowNodes);
      setEdges(reactFlowEdges);

    } catch (error) {
      console.error("Error fetching flow:", error);
    } finally {
      setLoading(false);
    }
  };

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    const procedureId = node.data.procedureId;
    if (procedureId) {
      const procedure = procedures.find(p => p.id === procedureId);
      if (procedure) {
        window.open(procedure.link, "_blank");
      }
    }
  }, [procedures]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole={userRole} />
        <div className="max-w-7xl mx-auto p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!flow) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole={userRole} />
        <div className="max-w-7xl mx-auto p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Prosessflyt ikke funnet</h1>
            <Link
              to={`/bygg/${number}`}
              className="text-primary hover:opacity-80 transition-colors"
            >
              Tilbake til bygg
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
            to={`/bygg/${number}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake til bygg {number}
          </Link>
        </div>

        {/* Flow Header */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{flow.title}</h1>
              <p className="text-muted-foreground">
                Prosessflyt for Bygg {number}
              </p>
            </div>
            {userRole === "admin" && (
              <Link
                to={`/bygg/${number}/flow/${flowId}/edit`}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Rediger flyt
              </Link>
            )}
          </div>
        </div>

        {/* Flow Diagram */}
        <div className="bg-card border border-border rounded-lg overflow-hidden" style={{ height: "600px" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>

        {/* Instructions */}
        <div className="bg-card border border-border rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-foreground mb-4">Instruksjoner</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Klikk på noder med prosedyrer for å åpne dokumentet i ny fane</p>
            <p>• Bruk kontrollene nederst til høyre for å zoome og navigere</p>
            <p>• Minikartet viser oversikt over hele flyten</p>
            {userRole === "admin" && (
              <p>• Bruk "Rediger flyt" knappen for å endre eller legge til noder</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
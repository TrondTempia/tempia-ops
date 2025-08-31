import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import ReactFlow, {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MiniMap,
  Connection,
  ConnectionMode,
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

export default function FlowEditor() {
  const { number, flowId } = useParams<{ number: string; flowId: string }>();
  const [flow, setFlow] = useState<FlowData | null>(null);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<"admin" | "viewer">("viewer");
  const [saving, setSaving] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodeForm, setNodeForm] = useState({
    label: "",
    type: "step" as "start" | "step" | "decision" | "end",
    procedureId: "",
  });

  useEffect(() => {
    if (flowId) {
      fetchFlow();
      fetchProcedures();
      checkUserRole();
    }
  }, [flowId]);

  const checkUserRole = async () => {
    const user = await getCurrentUser();
    const role = getUserRole(user);
    setUserRole(role);
    
    if (role === "viewer") {
      // Redirect viewers away from editor
      window.location.href = `/bygg/${number}/flow/${flowId}`;
    }
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

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setNodeForm({
      label: node.data.label,
      type: node.type as "start" | "step" | "decision" | "end",
      procedureId: node.data.procedureId || "",
    });
  }, []);

  const addNewNode = () => {
    const newNode: Node = {
      id: `temp-${Date.now()}`,
      type: "step",
      position: { x: 250, y: 250 },
      data: { label: "Ny node", procedureId: null },
    };
    setNodes((nds) => [...nds, newNode]);
    setSelectedNode(newNode);
    setNodeForm({
      label: "Ny node",
      type: "step",
      procedureId: "",
    });
  };

  const updateSelectedNode = () => {
    if (!selectedNode) return;

    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? {
              ...node,
              type: nodeForm.type,
              data: {
                ...node.data,
                label: nodeForm.label,
                procedureId: nodeForm.procedureId || null,
              },
            }
          : node
      )
    );
    setSelectedNode(null);
  };

  const deleteSelectedNode = () => {
    if (!selectedNode || !confirm("Er du sikker på at du vil slette denne noden?")) return;

    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    setEdges((eds) => eds.filter((edge) => 
      edge.source !== selectedNode.id && edge.target !== selectedNode.id
    ));
    setSelectedNode(null);
  };

  const saveFlow = async () => {
    if (!flow) return;

    setSaving(true);
    try {
      // Delete existing nodes and edges
      await supabase.from("flow_edges").delete().eq("flow_id", flow.id);
      await supabase.from("flow_nodes").delete().eq("flow_id", flow.id);

      // Insert new nodes
      const nodeInserts = nodes.map((node) => ({
        id: node.id.startsWith("temp-") ? undefined : node.id,
        flow_id: flow.id,
        label: node.data.label,
        type: node.type,
        procedure_id: node.data.procedureId || null,
        x: Math.round(node.position.x),
        y: Math.round(node.position.y),
      }));

      const { data: insertedNodes, error: nodesError } = await supabase
        .from("flow_nodes")
        .insert(nodeInserts)
        .select();

      if (nodesError) throw nodesError;

      // Create mapping from temp IDs to real IDs
      const idMapping: { [key: string]: string } = {};
      nodes.forEach((node, index) => {
        idMapping[node.id] = insertedNodes[index].id;
      });

      // Insert new edges with mapped IDs
      const edgeInserts = edges.map((edge) => ({
        id: edge.id.startsWith("reactflow__edge") ? undefined : edge.id,
        flow_id: flow.id,
        source: idMapping[edge.source] || edge.source,
        target: idMapping[edge.target] || edge.target,
      }));

      if (edgeInserts.length > 0) {
        const { error: edgesError } = await supabase
          .from("flow_edges")
          .insert(edgeInserts);

        if (edgesError) throw edgesError;
      }

      // Refresh the flow
      await fetchFlow();
      alert("Prosessflyt lagret!");

    } catch (error) {
      console.error("Error saving flow:", error);
      alert("Feil ved lagring av prosessflyt");
    } finally {
      setSaving(false);
    }
  };

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

  if (!flow || userRole === "viewer") {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole={userRole} />
        <div className="max-w-7xl mx-auto p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Ingen tilgang</h1>
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
            to={`/bygg/${number}/flow/${flowId}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake til flyt
          </Link>
        </div>

        {/* Flow Header */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Rediger: {flow.title}</h1>
              <p className="text-muted-foreground">
                Prosessflyt editor for Bygg {number}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={addNewNode}
                className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Ny node
              </button>
              <button
                onClick={saveFlow}
                disabled={saving}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Lagrer..." : "Lagre"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Flow Diagram */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-lg overflow-hidden" style={{ height: "600px" }}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                connectionMode={ConnectionMode.Loose}
                fitView
              >
                <Background />
                <Controls />
                <MiniMap />
              </ReactFlow>
            </div>
          </div>

          {/* Node Editor Panel */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">
                {selectedNode ? "Rediger node" : "Velg en node"}
              </h3>
              
              {selectedNode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Label
                    </label>
                    <input
                      type="text"
                      value={nodeForm.label}
                      onChange={(e) => setNodeForm({ ...nodeForm, label: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Type
                    </label>
                    <select
                      value={nodeForm.type}
                      onChange={(e) => setNodeForm({ ...nodeForm, type: e.target.value as any })}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm"
                    >
                      <option value="start">Start</option>
                      <option value="step">Steg</option>
                      <option value="decision">Beslutning</option>
                      <option value="end">Slutt</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Prosedyre (valgfritt)
                    </label>
                    <select
                      value={nodeForm.procedureId}
                      onChange={(e) => setNodeForm({ ...nodeForm, procedureId: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground text-sm"
                    >
                      <option value="">Ingen prosedyre</option>
                      {procedures.map((procedure) => (
                        <option key={procedure.id} value={procedure.id}>
                          {procedure.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={updateSelectedNode}
                      className="flex-1 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-colors"
                    >
                      Oppdater
                    </button>
                    <button
                      onClick={deleteSelectedNode}
                      className="flex items-center justify-center bg-destructive text-destructive-foreground px-3 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Klikk på en node i diagrammet for å redigere den.
                </p>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-card border border-border rounded-lg p-6 mt-6">
              <h3 className="font-semibold text-foreground mb-4">Instruksjoner</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Klikk på noder for å redigere</p>
                <p>• Dra noder for å flytte dem</p>
                <p>• Dra fra en node til en annen for å lage en forbindelse</p>
                <p>• Bruk "Ny node" for å legge til nye noder</p>
                <p>• Husk å lagre endringene dine</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
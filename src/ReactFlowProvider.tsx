import ReactFlow, {
  MiniMap,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
} from "react-flow-renderer";
import { edgeState, nodeState, nodeTypesState } from "./Atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useCallback } from "react";

export function ReactFlowProvider() {
  const [nodes, setNodes] = useRecoilState(nodeState);
  const [edges, setEdges] = useRecoilState(edgeState);
  const nodeTypes = useRecoilValue(nodeTypesState);

  const onNodesChange = useCallback(
    //@ts-ignore
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  function addNode() {
    setNodes([
      ...nodes,
      {
        id: String(nodes.length + 1),
        type: "additionNode",
        data: { id: String(nodes.length + 1) },
        position: { x: 450, y: 25 },
      },
    ]);
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button
        onClick={() => {
          addNode();
        }}
      >
        Add node
      </button>
      <button
        onClick={() => {
          console.log(nodes);
          console.log(edges);
        }}
      >
        Log Nodes and Edges
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}

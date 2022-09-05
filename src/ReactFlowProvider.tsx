import ReactFlow, {
  MiniMap,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
} from "react-flow-renderer";
import { edgeState, nodeState, nodeTypesState } from "./Recoil/Atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useCallback } from "react";
import { PageHeader, Button, Space } from "antd";

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
        type: "doubleNumNode",
        data: {},
        position: { x: 450, y: 25 },
      },
    ]);
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <PageHeader
        title="Eth_Rebuild"
        subTitle="Inspired by Austin Griffith's rad project, eth.build"
        onBack={() => null}
      />
      <Space style={{ margin: "20px" }}>
        <Button
          type="primary"
          onClick={() => {
            addNode();
          }}
        >
          Add node
        </Button>
        <Button
          type="primary"
          onClick={() => {
            console.log(nodes);
            console.log(edges);
          }}
        >
          Log Nodes and Edges
        </Button>
      </Space>
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

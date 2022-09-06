import ReactFlow, {
  MiniMap,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
} from "react-flow-renderer";
import {
  cursorPositionState,
  edgeState,
  nodeState,
  nodeTypesState,
} from "./Recoil/Atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useCallback } from "react";
import { PageHeader, Dropdown, Menu } from "antd";

export function Flow() {
  const [nodes, setNodes] = useRecoilState(nodeState);
  const [edges, setEdges] = useRecoilState(edgeState);
  const [cursorPos, setCursorPos] = useRecoilState(cursorPositionState);
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

  function addNode(type: string, xPos: number, yPos: number) {
    setNodes([
      ...nodes,
      {
        id: String(nodes.length + 1),
        type: type,
        data: {},
        position: { x: xPos, y: yPos },
      },
    ]);
  }

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: "String Input Node",
          onClick: () => addNode("stringInputNode", cursorPos.x, cursorPos.y),
        },
        {
          key: "2",
          label: "String Concat Node",
          onClick: () => addNode("stringConcatNode", cursorPos.x, cursorPos.y),
        },
        {
          key: "3",
          label: "String Display Node",
          onClick: () => addNode("stringDisplayNode", cursorPos.x, cursorPos.y),
        },
        {
          key: "4",
          label: "Log edges and nodes",
          onClick: () => console.log(nodes, edges),
        },
      ]}
    />
  );

  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      onMouseMove={(e) =>
        setCursorPos({ x: e.clientX - 100, y: e.clientY - 100 })
      }
    >
      <PageHeader
        title="Eth_Rebuild"
        subTitle="Inspired by Austin Griffith's rad project, eth.build"
        onBack={() => null}
      />
      <Dropdown overlay={menu} trigger={["contextMenu"]}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onPaneContextMenu={(e) => e.preventDefault()}
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </Dropdown>
    </div>
  );
}

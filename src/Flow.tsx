import ReactFlow, {
  MiniMap,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  useViewport,
  useReactFlow,
} from "react-flow-renderer";
import {
  cursorPositionState,
  edgeState,
  nodeState,
  nodeTypesPrettyState,
  nodeTypesState,
} from "./Recoil/Atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useCallback, useRef } from "react";
import { PageHeader, Dropdown, Menu } from "antd";

export function Flow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useRecoilState(nodeState);
  const [edges, setEdges] = useRecoilState(edgeState);
  const [cursorPos, setCursorPos] = useRecoilState(cursorPositionState);
  const nodeTypes = useRecoilValue(nodeTypesState);
  const nodeTypesPretty = useRecoilValue(nodeTypesPrettyState);
  const { project } = useReactFlow();
  const view = useViewport();

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
        position: project({ x: xPos - 100, y: yPos - 100 }),
      },
    ]);
  }

  const menu = (
    <Menu
      items={Object.keys(nodeTypes).map((key) => ({
        key: key,
        label: nodeTypesPretty[key],
        onClick: () => addNode(key, cursorPos.x, cursorPos.y),
      }))}
    ></Menu>
  );

  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      onMouseMove={(e) => {
        setCursorPos({
          x: e.clientX,
          y: e.clientY,
        });
      }}
      ref={reactFlowWrapper}
    >
      <PageHeader
        title="Eth_Rebuild"
        subTitle="Inspired by Austin Griffith's rad project, eth.build"
        onBack={() => console.log(view)}
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

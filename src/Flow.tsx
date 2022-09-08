import ReactFlow, {
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
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
import { Dropdown, Menu } from "antd";

export function Flow() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useRecoilState(nodeState);
  const [edges, setEdges] = useRecoilState(edgeState);
  const [cursorPos, setCursorPos] = useRecoilState(cursorPositionState);
  const nodeTypes = useRecoilValue(nodeTypesState);
  const nodeTypesPretty = useRecoilValue(nodeTypesPrettyState);
  const { project } = useReactFlow();

  const onNodesChange = useCallback(
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

  const onNodeDelete = useCallback((nodesDeleted) => {
    setNodes((nds) => nds.filter((n) => !nodesDeleted.includes(n.id)));
    console.log(nodes);
  }, []);

  function addNode(type: string, xPos: number, yPos: number) {
    const lastNodeId = nodes.length ? Number(nodes[nodes.length - 1].id) : 0;
    setNodes([
      ...nodes,
      {
        id: String(lastNodeId + 1),
        type: type,
        data: {},
        position: project({ x: xPos - 100, y: yPos - 100 }),
      },
    ]);
  }

  const menu = (
    <Menu
      theme="dark"
      items={[
        {
          key: "Inputs",
          label: "Inputs",
          children: Object.keys(nodeTypesPretty.inputs).map((key) => {
            return {
              key: key,
              label: nodeTypesPretty.inputs[key],
              onClick: () => addNode(key, cursorPos.x, cursorPos.y),
            };
          }),
        },
        {
          key: "Pipes",
          label: "Pipes",
          children: Object.keys(nodeTypesPretty.pipes).map((key) => {
            return {
              key: key,
              label: nodeTypesPretty.pipes[key],
              onClick: () => addNode(key, cursorPos.x, cursorPos.y),
            };
          }),
        },
        {
          key: "Displays",
          label: "Displays",
          children: Object.keys(nodeTypesPretty.displays).map((key) => {
            return {
              key: key,
              label: nodeTypesPretty.displays[key],
              onClick: () => addNode(key, cursorPos.x, cursorPos.y),
            };
          }),
        },
      ]}
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
      {/* <PageHeader
        title="Eth_Rebuild"
        subTitle="Inspired by Austin Griffith's rad project, eth.build"
        onBack={() => console.log(nodes)}
      /> */}
      <Dropdown overlay={menu} trigger={["contextMenu"]}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onPaneContextMenu={(e) => e.preventDefault()}
          onNodesDelete={onNodeDelete}
        >
          <Background />
          {/* <MiniMap /> */}
          <Controls />
        </ReactFlow>
      </Dropdown>
    </div>
  );
}

import ReactFlow, {
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  useReactFlow,
  NodeChange,
  EdgeChange,
  Connection,
  Edge,
  Node,
} from "react-flow-renderer";
import {
  cursorPositionState,
  edgeState,
  nodeState,
  nodeTypesState,
} from "./Recoil/Atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { ReactElement, useCallback, useRef } from "react";
import { Layout } from "antd";
import { MenuHeader } from "./Components/Header";
import { JsxElement } from "typescript";
import { CustomControls } from "./Components/CustomControls";

const { Content } = Layout;

export function Flow() {
  const [nodes, setNodes] = useRecoilState(nodeState);
  const [edges, setEdges] = useRecoilState(edgeState);
  const [_, setCursorPos] = useRecoilState(cursorPositionState);
  const nodeTypes = useRecoilValue(nodeTypesState);
  const connectingNodeId = useRef("0");
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: Edge | Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectStop = useCallback(
    (event: MouseEvent) => {
      if (event.target instanceof Element) {
        const targetIsPane =
          event.target.classList.contains("react-flow__pane");

        if (targetIsPane) {
          if (reactFlowWrapper.current?.getBoundingClientRect()) {
            const { top, left } =
              reactFlowWrapper.current.getBoundingClientRect();
            const id = nodes.length ? nodes[nodes.length - 1].id : String(0);
            const newNode = {
              id,
              type: "stringDisplayNode",
              position: project({
                x: event.clientX - left - 75,
                y: event.clientY - top,
              }),
              data: { label: `Node ${id}` },
            };

            setNodes((nds) => nds.concat(newNode));
            setEdges((eds) =>
              eds.concat([{ id, source: connectingNodeId.current, target: id }])
            );
          }
        }
      }
    },
    [project]
  );

  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <MenuHeader />
      <Content>
        <div
          ref={reactFlowWrapper}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onPaneContextMenu={(e) => e.preventDefault()}
            onConnectStart={onConnectStart}
            onConnectStop={onConnectStop}
            onMouseMove={(e) => {
              setCursorPos({
                x: e.clientX,
                y: e.clientY,
              });
            }}
          >
            <Background />
            <CustomControls />
          </ReactFlow>
        </div>
      </Content>
    </Layout>
  );
}

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
} from "reactflow";
import "reactflow/dist/style.css";
import { cursorPositionState, edgeState, globalVariablesState, maxNodeIdState, nodeState, nodeTypesState } from "./Recoil/Atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useCallback, useEffect, useRef } from "react";
import { Button, Layout } from "antd";
import { MenuHeader } from "./Components/Header";
import { CustomControls } from "./Components/CustomControls";
import { useState } from "react";
import { allNodeDataSelector } from "./Recoil/Selectors/selectors";
import { testAddBuildToDB, testGetBuildFromDB } from "./Recoil/firebase";

const { Content } = Layout;

export function Flow() {
  // @notice general data
  const [nodes, setNodes] = useRecoilState(nodeState);
  const [edges, setEdges] = useRecoilState(edgeState);
  const [nodeData, setNodeData] = useRecoilState(allNodeDataSelector);
  const [_, setCursorPos] = useRecoilState(cursorPositionState);

  // @notice for adding new nodes
  const [maxNodeId, setMaxNodeId] = useRecoilState(maxNodeIdState);
  const nodeTypes = useRecoilValue(nodeTypesState);

  // @notice for the drag and drop handles
  const connectingNodeId = useRef("");
  const connectingNodeHandleId = useRef("");
  const connectingNodeHandleType = useRef("");

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();

  const [savedNodes, setSavedNodes] = useState(nodes);
  const [savedEdges, setSavedEdges] = useState(edges);
  const [savedNodeState, setSavedNodeState] = useState(nodeData);

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);

  const onConnect = useCallback(
    (connection: Edge | Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const onConnectStart = useCallback((_, { nodeId, handleId, handleType }) => {
    connectingNodeId.current = nodeId;
    connectingNodeHandleId.current = handleId;
    connectingNodeHandleType.current = handleType;
  }, []);

  const onConnectEnd = useCallback(
    (event: MouseEvent) => {
      if (event.target instanceof Element) {
        const targetIsPane = event.target.classList.contains("react-flow__pane");
        if (targetIsPane) {
          if (reactFlowWrapper.current?.getBoundingClientRect()) {
            // TODO: REMOVE THIS REDUNDANCY (see src/Components/Header.tsx function addNode)
            const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
            const id = String(maxNodeId);
            setMaxNodeId(maxNodeId + 1);
            const newNode = {
              id,
              type: connectingNodeHandleType.current == "source" ? "stringDisplayNode" : "anyInputNode",
              position: project({
                x: event.clientX - left - 75,
                y: event.clientY - top,
              }),
              data: { label: `Node ${id}` },
            };
            setNodes((nds) => nds.concat(newNode));
            setEdges((eds) =>
              eds.concat(
                connectingNodeHandleType.current == "source"
                  ? {
                      id: `${connectingNodeId.current}-${id}`,
                      source: connectingNodeId.current,
                      sourceHandle: connectingNodeHandleId.current,
                      target: id,
                      targetHandle: "a",
                    }
                  : {
                      id: `${id}a-${connectingNodeId.current}${connectingNodeHandleId.current}`,
                      source: id,
                      sourceHandle: "a",
                      target: connectingNodeId.current,
                      targetHandle: connectingNodeHandleId.current,
                    }
              )
            );
          }
        }
      }
    },
    [nodes]
  );

  const db = useRecoilValue(globalVariablesState)["db"];
  useEffect(() => {
    console.log(db);
  }, [db]);

  return (
    <Layout
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <MenuHeader />
      <Button
        type="primary"
        onClick={() => {
          console.log(
            JSON.stringify({
              nodes: savedNodes,
              edges: savedEdges,
              nodeData: savedNodeState,
            })
          );
        }}
      >
        Export
      </Button>
      <Button
        type="primary"
        onClick={async () => {
          console.log("Uploading to DB");
          try {
            await testAddBuildToDB(nodes, edges, nodeData);
            console.log("Done");
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Save
      </Button>
      <Button
        type="primary"
        onClick={async () => {
          console.log("Fetching...");
          try {
            const res = JSON.parse(await testGetBuildFromDB());
            if (res) {
              setNodes(res.nodes);
              setEdges(res.edges);
              setNodeData(res.nodeData);
            }
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Load
      </Button>
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
            onConnectEnd={onConnectEnd}
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

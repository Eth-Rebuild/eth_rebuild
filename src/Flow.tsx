import ReactFlow, { applyNodeChanges, applyEdgeChanges, addEdge, Background, useReactFlow, NodeChange, EdgeChange, Connection, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { blockNumberState, chainIdState, cursorPositionState, edgeState, nodeState, nodeTypesState } from "./Recoil/Atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useRef } from "react";
import { Button, Layout } from "antd";
import { MenuHeader } from "./Components/Header";
import { CustomControls } from "./Components/CustomControls";
import { useParams } from "react-router-dom";
import { useBlockNumber } from "wagmi";
import { useReactFlowHelpers } from "./Helpers/helpers";

const { Content } = Layout;

export function Flow() {
  // @notice general data
  const nodes = useRecoilValue(nodeState);
  const edges = useRecoilValue(edgeState);
  const [_, setCursorPos] = useRecoilState(cursorPositionState);

  // @notice url_params, or generate a random number if it is a new build
  const buildId = useParams().buildId;

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const { onConnectStart, onConnectEnd, onEdgesChange, onNodesChange, onConnect, nodeTypes, loadBuild, saveBuild } = useReactFlowHelpers(reactFlowWrapper);

  // @notice on mount, if no buildId, generate a random number
  useEffect(() => {
    if (!buildId) {
      window.location.href = "/build/" + String(Math.floor(Math.random() * 1_000_000_000_000_000_000));
    }
    loadBuild(buildId);
  }, []);

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
        onClick={async () => {
          console.log("Uploading to DB");
          try {
            await saveBuild(buildId);
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
          navigator.clipboard.writeText(window.location.origin + "/create/" + buildId);
        }}
      >
        Copy URL
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

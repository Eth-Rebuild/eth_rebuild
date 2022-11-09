import { useCallback, useEffect, useRef } from "react";
import { addEdge, applyEdgeChanges, applyNodeChanges, Connection, Edge, EdgeChange, Handle, Node, NodeChange, Position, useReactFlow } from "reactflow";
import { useRecoilCallback, useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { useBlockNumber } from "wagmi";
import { blockNumberState, chainIdState, edgeState, nodeDataState, nodeState, nodeTypesState } from "../Recoil/Atoms/atoms";
import { addBuildToDB, Build, getBuildFromDB } from "../Recoil/firebase";
import { allNodeDataSelector, maxNodeIdSelector, validNodeConnectionSelector } from "../Recoil/Selectors/selectors";

export const alphaArray = "abcdefghijklmnopqrstuvwxyz".split("");

type HandleType = "string" | "number" | "boolean" | "address" | "array" | "object" | "any";

interface HandleTypes {
  [key: string]: HandleType;
}

interface HandlesProps {
  id: string;
  inputTypes?: HandleTypes;
  outputTypes?: HandleTypes;
  inputLabels?: string[];
  outputLabels?: string[];
}

export function Handles(props: HandlesProps) {
  const { inputTypes, outputTypes, inputLabels, outputLabels, id } = props;
  const [state, setState] = useRecoilState(nodeDataState(id));
  const validConnections = useRecoilValue(validNodeConnectionSelector(id));

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      inputTypes,
      outputTypes,
    }));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {inputTypes ? createHandles(Object.keys(inputTypes).length, "input", validConnections, inputLabels) : ""}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {outputTypes ? createHandles(Object.keys(outputTypes).length, "output", validConnections, outputLabels) : ""}
      </div>
    </div>
  );
}

function createHandles(count: number, kind: string, validConnections: any, labels?: string[]) {
  return Array.from(Array(count)).map((_, index) => (
    <div
      key={kind + index.toString()}
      style={{
        display: "flex",
        alignSelf: kind === "input" ? "start" : "end",
      }}
    >
      <Handle
        type={kind === "input" ? "target" : "source"} // @dev I really just don't like the word target and source, so im using input and output
        position={kind === "input" ? Position.Left : Position.Right}
        style={{
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          backgroundColor: kind === "input" ? "#DB79FF" : "#6FCF97",
          cursor: "pointer",
          border: "1px solid #ffffff",
          position: "relative",
          order: 2,
        }}
        id={alphaArray[index]}
        isValidConnection={(connection: Connection) => {
          // grab the target
          const { target, targetHandle, sourceHandle } = connection;
          // null checking
          if (target && targetHandle && sourceHandle) {
            // check if the connected at target, and handle is valid
            const validHandles = validConnections?.[sourceHandle]?.[target];
            return validHandles ? validHandles.includes(targetHandle) : false;
          } else {
            return false;
          }
        }}
      />
      <span
        style={{
          order: kind === "input" ? 3 : 1,
        }}
      >
        {labels ? labels[index] : ""}
      </span>
    </div>
  ));
}

export function useReactFlowHelpers(reactFlowWrapper) {
  // @notice all the getters and setters for the react flow instance
  const maxNodeId = useRecoilValue(maxNodeIdSelector);
  const [nodes, setNodes] = useRecoilState(nodeState);
  const [edges, setEdges] = useRecoilState(edgeState);
  const [nodeData, setNodeData] = useRecoilState(allNodeDataSelector);
  const [blockNumber, setBlockNumber] = useRecoilState(blockNumberState);

  const chainId = useRecoilValue(chainIdState);
  const userAddress = localStorage.getItem("userAddress");
  const connectingNodeId = useRef("");
  const connectingNodeHandleId = useRef("");
  const connectingNodeHandleType = useRef("");
  const { project } = useReactFlow();

  // @notice all the callbacks for the react flow instance
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
            const id = maxNodeId;
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
  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);
  const onConnect = useCallback(
    (connection: Edge | Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );
  const nodeTypes = useRecoilValue(nodeTypesState);

  // @notice for updating the block number atom
  useBlockNumber({
    watch: true,
    chainId,
    onBlock(blockNumber) {
      console.log("A new block is here🧱: ", blockNumber);
      setBlockNumber(blockNumber);
    },
  });

  // @notice all the callbacks for interaction with the db
  async function loadBuild(buildId) {
    if (buildId) {
      try {
        console.log("loading build");
        const build = JSON.parse(await getBuildFromDB(buildId));
        const { nodes, edges, nodeData } = build;
        setNodes(nodes);
        setEdges(edges);
        setNodeData(nodeData);
      } catch (e) {
        console.log("This is a new build!");
      }
    }
  }

  async function saveBuild(buildId) {
    if (buildId) {
      if (userAddress) {
        try {
          const build: Build = {
            id: buildId,
            nodes,
            edges,
            nodeData,
            createdBy: userAddress,
          };
          await addBuildToDB(build);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  return { onConnectStart, onConnectEnd, onNodesChange, onEdgesChange, onConnect, nodeTypes, loadBuild, saveBuild };
}

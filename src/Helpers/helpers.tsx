import { useCallback, useEffect, useRef } from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Handle,
  Node,
  NodeChange,
  Position,
  useReactFlow,
  MarkerType,
} from "reactflow";
import {
  useRecoilCallback,
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import { useBlockNumber } from "wagmi";
import {
  blockNumberState,
  chainIdState,
  edgeState,
  nodeDataState,
  nodeState,
  nodeTypesState,
} from "../Recoil/Atoms/atoms";
import { addBuildToDB, Build, getBuildFromDB } from "../Recoil/firebase";
import {
  allNodeDataSelector,
  maxNodeIdSelector,
  validNodeConnectionSelector,
} from "../Recoil/Selectors/selectors";

export const alphaArray = "abcdefghijklmnopqrstuvwxyz".split("");

type HandleType =
  | "string"
  | "number"
  | "boolean"
  | "address"
  | "array"
  | "object"
  | "any";

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
        {inputTypes
          ? createHandles(
              Object.keys(inputTypes).length,
              "input",
              validConnections,
              inputLabels
            )
          : ""}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {outputTypes
          ? createHandles(
              Object.keys(outputTypes).length,
              "output",
              validConnections,
              outputLabels
            )
          : ""}
      </div>
    </div>
  );
}

export function createHandles(
  count: number,
  kind: string,
  validConnections: any,
  labels?: string[]
) {
  function getKind(kind: string, index: number) {
    if (kind === "input" && index !== 1) {
      return "target";
    } else if (kind === "output" && index !== 1) {
      return "source";
    } else if (kind === "input" && index === 1) {
      return "source";
    } else {
      return "target";
    }
  }

  return Array.from(Array(count)).map((_, index) => (
    <div
      key={kind + index.toString()}
      style={{
        display: "flex",
        alignSelf: kind === "input" ? "start" : "end",
      }}
    >
      <Handle
        type={getKind(kind, index)} // @dev I really just don't like the word target and source, so im using input and output
        position={kind === "input" ? Position.Left : Position.Right}
        style={{
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          backgroundColor:
            getKind(kind, index) === "target" ? "#DB79FF" : "#6FCF97",
          cursor: "pointer",
          border: "1px solid #ffffff",
          position: "relative",
          order: 2,
        }}
        //id={index !== 1 ? alphaArray[index] : "a"}
        id={kind === "input" ? "a" : "b"}
        isValidConnection={(connection: Connection) => {
          return true;
          //// grab the target
          //const { target, targetHandle, sourceHandle } = connection;
          //// null checking
          //if (target && targetHandle && sourceHandle) {
          //  // check if the connected at target, and handle is valid
          //  const validHandles = validConnections?.[sourceHandle]?.[target];
          //  return validHandles ? validHandles.includes(targetHandle) : false;
          //} else {
          //  return false;
          //}
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
    console.log("onConnectStart", nodeId, handleId, handleType);
  }, []);

  const onConnectEnd = useCallback(
    (event: MouseEvent) => {
      function getEdgeColor(selectedHandleType: string, id: string) {
        if (selectedHandleType === "source" && id === "a") {
          return "#6FCF97";
        } else if (selectedHandleType === "target" && id === "a") {
          return "#FF0072";
        } else if (selectedHandleType === "source" && id === "b") {
          return "#FF0072";
        } else if (selectedHandleType === "target" && id === "b") {
          return "#6FCF97";
        }
      }

      if (event.target instanceof Element) {
        const targetIsPane =
          event.target.classList.contains("react-flow__pane");
        if (targetIsPane) {
          if (reactFlowWrapper.current?.getBoundingClientRect()) {
            // TODO: REMOVE THIS REDUNDANCY (see src/Components/Header.tsx function addNode)
            const { top, left } =
              reactFlowWrapper.current.getBoundingClientRect();
            const id = maxNodeId;
            const newNode = {
              id,
              type: "valueNode",
              position: project({
                x: event.clientX - left - 75,
                y: event.clientY - top,
              }),
              data: { label: `Node ${id}` },
            };
            setNodes((nds) => nds.concat(newNode));
            setEdges((eds) =>
              eds.concat(
                connectingNodeHandleType.current === "source"
                  ? {
                      id: `${connectingNodeId.current}${connectingNodeHandleId.current}-${id}a`,
                      source: connectingNodeId.current,
                      sourceHandle: connectingNodeHandleId.current,
                      target: id,
                      label:
                        getEdgeColor(
                          connectingNodeHandleType.current,
                          connectingNodeHandleId.current
                        ) === "#FF0072"
                          ? "Value"
                          : "Profit",
                      markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 20,
                        height: 20,
                        color: getEdgeColor(
                          connectingNodeHandleType.current,
                          connectingNodeHandleId.current
                        ),
                      },
                      style: {
                        strokeWidth: 2,
                        stroke: getEdgeColor(
                          connectingNodeHandleType.current,
                          connectingNodeHandleId.current
                        ),
                      },
                      targetHandle:
                        connectingNodeHandleId.current === "a" ? "b" : "a",
                    }
                  : {
                      id: `${id}a-${connectingNodeId.current}${connectingNodeHandleId.current}`,
                      source: id,
                      markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 20,
                        height: 20,
                        color: getEdgeColor(
                          connectingNodeHandleType.current,
                          connectingNodeHandleId.current
                        ),
                      },
                      label:
                        connectingNodeHandleId.current === "a"
                          ? "Value"
                          : "Profit",
                      style: {
                        strokeWidth: 2,
                        stroke: getEdgeColor(
                          connectingNodeHandleType.current,
                          connectingNodeHandleId.current
                        ),
                      },
                      sourceHandle:
                        connectingNodeHandleId.current === "a" ? "b" : "a",
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
      const newConnection = {
        ...connection,
        label: connection.sourceHandle === "b" ? "Value" : "Profit",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: connection.sourceHandle === "b" ? "#FF0072" : "#6FCF97",
        },
        style: {
          strokeWidth: 2,
          stroke: connection.sourceHandle === "b" ? "#FF0072" : "#6FCF97",
        },
      };
      console.log("onConnect", newConnection);
      setEdges((eds) => addEdge(newConnection, eds));
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

  return {
    onConnectStart,
    onConnectEnd,
    onNodesChange,
    onEdgesChange,
    onConnect,
    nodeTypes,
    loadBuild,
    saveBuild,
  };
}

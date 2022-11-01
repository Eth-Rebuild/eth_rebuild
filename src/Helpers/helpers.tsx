import { useEffect } from "react";
import { Connection, Edge, Handle, Node, Position } from "reactflow";
import { useRecoilCallback, useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from "recoil";
import { edgeState, nodeDataState, nodeState } from "../Recoil/Atoms/atoms";
import { validNodeConnectionSelector } from "../Recoil/Selectors/selectors";

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

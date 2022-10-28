import { useEffect } from "react";
import { Connection, Handle, Position } from "reactflow";
import { useRecoilCallback, useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from "recoil";
import { cursorPositionState, nodeDataState, nodeState } from "../Recoil/Atoms/atoms";
import { validNodeConnectionSelector } from "../Recoil/Selectors/selectors";

export const alphaArray = "abcdefghijklmnopqrstuvwxyz".split("");

interface HandlesProps {
  id: string;
  inputTypes?: object;
  outputTypes?: object;
  inputLabels?: string[];
  outputLabels?: string[];
}

export function Handles(props: HandlesProps) {
  const { inputTypes, outputTypes, inputLabels, outputLabels, id} = props;
  const [state, setState] = useRecoilState(nodeDataState(id));
  const nodes = useRecoilValue(nodeState);
  const validConnections = useRecoilValue(validNodeConnectionSelector(id));

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      inputTypes,
      outputTypes
    }));
  }, []);

  useEffect(() => {
    console.log(validConnections)
    console.log(state)
  }, [nodes])

  return (
    <div
    style={{
    display: "flex",
    flexDirection: "column"
    }}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start"
      }}
    >
      {inputTypes ? createHandles(Object.keys(inputTypes).length, "input", validConnections, inputLabels) : ""}
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start"
      }}
    >
      {outputTypes ? createHandles(Object.keys(outputTypes).length, "output", validConnections, outputLabels) : ""}
    </div>
    </div>
  );
}

function createHandles(count:number, kind: string, validConnections: any, labels?: string[]) {
      return (Array.from(Array(count)).map((_, index) => (
        <div
          key={kind + index.toString()}
          style={{
            display: "flex",
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
      )));
}

export function getDataSources(connectedValue: any[] | undefined, count: number) {
  if (!connectedValue) return undefined;
  if (connectedValue.length >= count - 1) {
    return connectedValue.slice(0, count);
  }
}

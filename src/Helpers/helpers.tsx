import { useEffect } from "react";
import { Connection, Handle, Position } from "reactflow";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../Recoil/Atoms/atoms";
import { validNodeConnectionSelector } from "../Recoil/Selectors/selectors";

export const alphaArray = "abcdefghijklmnopqrstuvwxyz".split("");

interface HandlesProps {
  kind: string;
  count: number;
  id: string;
  types?: object;
  labels?: string[];
}

export function Handles(props: HandlesProps) {
  const { kind, count, types, labels, id } = props;
  const [, setState] = useRecoilState(nodeDataState(id));
  const validConnections = useRecoilValue(validNodeConnectionSelector(id));

  useEffect(() => {
    if (kind === "output") {
      setState((prevState) => ({
        outputTypes: types,
        ...prevState,
      }));
    } else {
      setState((prevState) => ({
        inputTypes: types,
        ...prevState,
      }));
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: kind === "input" ? "start" : "end",
      }}
    >
      {Array.from(Array(count)).map((_, index) => (
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
      ))}
    </div>
  );
}

export function getDataSources(connectedValue: any[] | undefined, count: number) {
  if (!connectedValue) return undefined;
  if (connectedValue.length >= count - 1) {
    return connectedValue.slice(0, count);
  }
}

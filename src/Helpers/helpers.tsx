import { useEffect } from "react";
import { useCallback } from "react";
import { Connection, Handle, Position } from "reactflow";
import { useRecoilState, useRecoilValue } from "recoil";
import { edgeState, nodeDataState, nodeState } from "../Recoil/Atoms/atoms";
import { connectedNodesSelector, isValidConnectionSelector, validHandleConnectionSelector, validNodeConnectionSelector } from "../Recoil/Selectors/selectors";

export const alphaArray = "abcdefghijklmnopqrstuvwxyz".split("");

interface HandlesProps {
  kind: string;
  count: number;
  id: string;
  types?: object;
  labels?: string[];
}

const useConnection = (target, targetHandle, source, sourceHandle) => {
  const sourceType = useRecoilValue(nodeDataState(source))["outputTypes"][sourceHandle];
  const targetType = useRecoilValue(nodeDataState(target))["inputTypes"][targetHandle];
  return sourceType === targetType;
};

export function Handles(props: HandlesProps) {
  const { kind, count, types, labels, id } = props;
  const [state, setState] = useRecoilState(nodeDataState(id));
  const validConnections = useRecoilValue(validNodeConnectionSelector(id));
  const nodes = useRecoilValue(nodeState);

  //update the state of the
  useEffect(() => {
    if (kind === "output") {
      setState((state) => {
        return {
          outputTypes: types,
          ...state,
        };
      });
    } else {
      setState((state) => ({
        inputTypes: types,
        ...state,
      }));
    }
  }, []);

  useEffect(() => {
    console.log("VALID CONNECTIONS for node ", id, ":", validConnections);
  }, [nodes]);

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
              const { target, targetHandle, source, sourceHandle } = connection;
              // null checking
              if (target && targetHandle && source && sourceHandle) {
                // check if the connected at target, and handle is valid
                return validConnections[target][targetHandle];
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
export function createHandles(kind: string, count: number, types?: string[], labels?: string[]) {
  // useEffect(() => {
  //   console.log("useEffect");
  // }, []);
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

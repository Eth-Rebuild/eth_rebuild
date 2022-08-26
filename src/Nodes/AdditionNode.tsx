import { useEffect } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useRecoilValue } from "recoil";
import {
  activeConnectionsSelector,
  connectedNodesSelector,
  edgeState,
} from "../Atoms/atoms";

export function AdditionNode({ data }) {
  const activeConnections = useRecoilValue(activeConnectionsSelector(data.id));
  const connectedNodes = useRecoilValue(connectedNodesSelector(data.id));

  return (
    <div
      style={{
        height: "100px",
        border: "1px solid black",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      <Handle type="target" position={Position.Top} id="a" />
      <Handle type="target" position={Position.Top} id="b" />
      <input
        type="number"
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
      {connectedNodes}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

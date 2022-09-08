import { useEffect } from "react";
import { Handle, Position, useUpdateNodeInternals } from "react-flow-renderer";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import {
  connectedValueSelector,
  numberDisplaySelector,
} from "../../Recoil/Selectors/selectors";

export function DynamicNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const connectedValue = useRecoilValue(connectedValueSelector(id));
  const updateNodeInterals = useUpdateNodeInternals();

  let handles = connectedValue.map((_, index) => {
    return (
      <Handle
        type="target"
        position={Position.Top}
        id={index.toString()}
        key={index}
        style={{ marginRight: index * 10 }}
      />
    );
  });

  return (
    <div className="custom-node">
      <Handle type="target" position={Position.Top} id="a" />
      {handles}
      <h1>Dynamic Node</h1>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

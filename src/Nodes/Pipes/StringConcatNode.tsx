import { useEffect } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import {
  connectedValueSelector,
  numberDisplaySelector,
  stringDisplaySelector,
} from "../../Recoil/Selectors/selectors";

export function StringConcatNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const connectedValues = useRecoilValue(connectedValueSelector(id));

  useEffect(() => {
    const stringToSave = connectedValues.join("");
    setState({ value: stringToSave });
  }, [connectedValues]);

  return (
    <div
      style={{
        height: "100px",
        border: "1px solid black",
        padding: "5px",
        borderRadius: "5px",
        backgroundColor: "#2a9d8f",
      }}
    >
      <Handle type="target" position={Position.Top} />
      <h1>String Concat Pipe ||</h1>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

import { useEffect } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import {
  numberDisplaySelector,
  stringDisplaySelector,
} from "../../Recoil/Selectors/selectors";

export function StringConcatNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const connectedValues = useRecoilValue(stringDisplaySelector(id));

  useEffect(() => {
    const stringToSave = connectedValues.join("");
    setState({ String: stringToSave });
  }, [connectedValues]);

  return (
    <div
      style={{
        height: "100px",
        border: "1px solid black",
        padding: "5px",
        borderRadius: "5px",
        backgroundColor: "green",
      }}
    >
      <Handle type="target" position={Position.Top} />
      <h1>String Concat Pipe ||</h1>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

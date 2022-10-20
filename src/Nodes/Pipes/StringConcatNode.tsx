import { useEffect } from "react";
import { Handle, Position } from "reactflow";
import { useRecoilState, useRecoilValue } from "recoil";
import { createHandles } from "../../Helpers/helpers";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../Recoil/Selectors/selectors";

export function StringConcatNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const connectedValues = useRecoilValue(connectedValueSelector(id));

  useEffect(() => {
    const stringToSave = connectedValues.join("");
    setState({ a: stringToSave });
  }, [connectedValues]);

  return (
    <div className="custom-node pipe">
      {createHandles("input", 1)}
      <h4>String Concat Pipe ||</h4>
      {createHandles("output", 1)}
    </div>
  );
}

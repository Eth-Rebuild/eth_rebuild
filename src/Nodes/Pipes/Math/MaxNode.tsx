import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { createHandles } from "../../../Helpers/helpers";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../../Recoil/Selectors/selectors";

export function MaxNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const a = useRecoilValue(connectedValueSelector([id, "a"]));
  const b = useRecoilValue(connectedValueSelector([id, "b"]));

  useEffect(() => {
    try {
      if (a && b) {
        const numToSave = a > b ? a : b;
        setState({ a: numToSave });
      } else {
        setState({ a: undefined });
      }
    } catch (e) {
      console.error(e);
    }
  }, [a, b]);

  return (
    <div className="custom-node pipe">
      <h4>Max Pipe</h4>
      {createHandles("input", 2, ["a", "b"])}
      {createHandles("output", 1)}
    </div>
  );
}

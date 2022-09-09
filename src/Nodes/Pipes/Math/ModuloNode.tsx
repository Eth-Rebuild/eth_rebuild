import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { createHandles } from "../../../Helpers/helpers";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../../Recoil/Selectors/selectors";

export function ModuloNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const a = useRecoilValue(connectedValueSelector([id, "a"]));
  const b = useRecoilValue(connectedValueSelector([id, "b"]));

  useEffect(() => {
    try {
      if (a && b) {
        const numToSave = a % b;
        setState({ a: numToSave });
      } else {
        setState({ a: undefined });
      }
    } catch (e) {
      console.error(e);
    }
  }, [a, b]);

  return (
    <div className="custom-node">
      <h4>Modulo Pipe</h4>
      {createHandles("input", 2, ["a", "b"])}
      {createHandles("output", 1)}
    </div>
  );
}

import { useEffect } from "react";
import { useUpdateNodeInternals } from "react-flow-renderer";
import { useRecoilState, useRecoilValue } from "recoil";
import { createHandles } from "../../../Helpers/helpers";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../../Recoil/Selectors/selectors";

export function NOTNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const a = useRecoilValue(connectedValueSelector([id, "a"]));

  useEffect(() => {
    try {
      if (a) {
        setState({ a: undefined });
      } else {
        setState({ a: true });
      }
    } catch (e) {
      console.error(e);
    }
  }, [a]);

  return (
    <div className="custom-node">
      <h4>NOT Node</h4>
      {createHandles("input", 1, ["a"])}
      {createHandles("output", 1)}
    </div>
  );
}

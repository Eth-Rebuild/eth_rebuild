import { useEffect } from "react";
import { useUpdateNodeInternals } from "reactflow";
import { useRecoilState, useRecoilValue } from "recoil";
import { Handles } from "../../../Helpers/helpers";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../../Recoil/Selectors/selectors";

export function NOTNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const a = useRecoilValue(connectedValueSelector([id, "a"]));

  useEffect(() => {
    try {
      if (a) {
        setState((state) => ({ ...state, a: undefined }));
      } else {
        setState((state) => ({ ...state, a: true }));
      }
    } catch (e) {
      console.error(e);
    }
  }, [a]);

  return (
    <div className="custom-node pipe">
      <h4>NOT Node</h4>
      <Handles
        id={id}
        inputTypes={{
          a: "any",
        }}
        inputLabels={["A"]}
        outputTypes={{
          a: "boolean",
        }}
      />
    </div>
  );
}

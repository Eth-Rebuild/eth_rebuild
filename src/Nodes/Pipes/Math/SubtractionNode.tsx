import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Handles } from "../../../Helpers/helpers";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../../Recoil/Selectors/selectors";

export function SubtractionNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const a = useRecoilValue(connectedValueSelector([id, "a"]));
  const b = useRecoilValue(connectedValueSelector([id, "b"]));

  useEffect(() => {
    try {
      if (a && b) {
        const numToSave = a - b;
        setState((state) => ({ ...state, a: numToSave }));
      } else {
        setState((state) => ({ ...state, a: undefined }));
      }
    } catch (e) {
      console.error(e);
    }
  }, [a, b]);

  return (
    <div className="custom-node pipe">
      <h4>Subtraction Pipe</h4>
      <Handles
        kind="input"
        count={2}
        id={id}
        types={{
          a: "number",
          b: "number",
        }}
        labels={["A", "B"]}
      />
      <Handles
        kind="output"
        count={1}
        id={id}
        types={{
          a: "number",
        }}
      />
    </div>
  );
}

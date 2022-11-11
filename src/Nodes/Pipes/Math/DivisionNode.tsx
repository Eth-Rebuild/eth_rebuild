import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Handles } from "../../../Helpers/helpers";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { allConnectedValueSelector } from "../../../Recoil/Selectors/selectors";

export function DivisionNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const { a, b, c } = useRecoilValue(allConnectedValueSelector(id));

  useEffect(() => {
    try {
      if (a && b) {
        const numToSave = a / b;
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
      <h4>Division Pipe</h4>
      <Handles
        id={id}
        inputTypes={{
          a: "number",
          b: "number",
        }}
        inputLabels={["A", "B"]}
        outputTypes={{
          a: "number",
        }}
      />
    </div>
  );
}

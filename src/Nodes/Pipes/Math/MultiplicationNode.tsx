import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Handles } from "../../../Helpers/helpers";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { allConnectedValueSelector, connectedValueSelector } from "../../../Recoil/Selectors/selectors";

export function MuliplicationNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const {a,b} = useRecoilValue(allConnectedValueSelector(id));

  useEffect(() => {
    try {
      setState((state) => ({...state, a: a && b ? a * b : undefined}))
    } catch (e) {
      console.error(e);
    }
  }, [a, b]);

  return (
    <div className="custom-node pipe">
      <h4>Multiplication Pipe</h4>
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

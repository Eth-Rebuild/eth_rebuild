import { useEffect } from "react";
import { Handle, Position } from "reactflow";
import { useRecoilState, useRecoilValue } from "recoil";
import { Handles } from "../../Helpers/helpers";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import { allConnectedValueSelector } from "../../Recoil/Selectors/selectors";

export function StringConcatNode({ id }) {
  const { a, b, c } = useRecoilValue(allConnectedValueSelector(id));

  const [state, setState] = useRecoilState(nodeDataState(id));

  useEffect(() => {
    if (a && b) {
      const stringToSave = a.concat(b);
      setState((prevState) => ({ ...prevState, a: stringToSave }));
    } else {
      setState((prevState) => ({ ...prevState, a: "" }));
    }
  }, [a, b]);

  return (
    <div className="custom-node pipe">
      <h4>String Concat Node</h4>
      <Handles
        id={id}
        inputTypes={{
          a: "string",
          b: "string",
        }}
        inputLabels={["String 1", "String 2"]}
        outputTypes={{
          a: "string",
        }}
      />
    </div>
  );
}

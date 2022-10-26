import { useEffect } from "react";
import { Handle, Position } from "reactflow";
import { useRecoilState, useRecoilValue } from "recoil";
import { Handles } from "../../Helpers/helpers";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../Recoil/Selectors/selectors";

export function StringConcatNode({ id }) {
  const a = useRecoilValue(connectedValueSelector([id, "a"]));
  const b = useRecoilValue(connectedValueSelector([id, "b"]));
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
        kind="input"
        count={2}
        id={id}
        types={{
          a: "string",
          b: "string",
        }}
        labels={["String 1", "String 2"]}
      />
      <Handles
        kind="output"
        count={1}
        id={id}
        types={{
          a: "string",
        }}
      />
    </div>
  );
}

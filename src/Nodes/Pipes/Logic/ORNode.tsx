import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Handles } from "../../../Helpers/helpers";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { allConnectedValueSelector } from "../../../Recoil/Selectors/selectors";

export function ORNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const { a, b, c } = useRecoilValue(allConnectedValueSelector(id));

  useEffect(() => {
    try {
      if (a || b) {
        setState((state) => ({ ...state, a: true }));
      } else {
        setState((state) => ({ ...state, a: undefined }));
      }
    } catch (e) {
      console.error(e);
    }
  }, [a, b]);

  return (
    <div className="custom-node pipe">
      <h4>OR Node</h4>
      <Handles
        id={id}
        inputTypes={{
          a: "any",
          b: "any",
        }}
        inputLabels={["A", "B"]}
        outputTypes={{
          a: "boolean",
        }}
      />
    </div>
  );
}

import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { createHandles, Handles } from "../../Helpers/helpers";
import { nodeDataState, edgeState } from "../../Recoil/Atoms/atoms";
import { allConnectedValueSelector } from "../../Recoil/Selectors/selectors";
import { Handle, Position } from "reactflow";

export function ValueNode({ id }) {
  const edges = useRecoilValue(edgeState);
  const [state, setState] = useRecoilState(nodeDataState(id));
  const { a, b } = useRecoilValue(allConnectedValueSelector(id));

  useEffect(() => {
    try {
      if (a && b) {
        const numToSave = a + b;
        setState((state) => ({ ...state, a: numToSave }));
      } else {
        setState((state) => ({ ...state, a: undefined }));
      }
    } catch (e) {
      console.error(e);
    }
  }, [a, b]);

  useEffect(() => {
    console.log("edges", edges);
  }, [edges]);

  return (
    <div className="custom-node pipe">
      <h4>ValueNode</h4>
      <Handles
        id={id}
        inputLabels={["value from project", "profit to project"]}
        inputTypes={{
          a: "any",
          b: "any",
        }}
        outputLabels={["value to project", "profit from project"]}
        outputTypes={{
          a: "any",
          b: "any",
        }}
      />
    </div>
  );
}

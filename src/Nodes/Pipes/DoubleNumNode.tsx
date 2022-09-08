import { useEffect } from "react";
import { useUpdateNodeInternals } from "react-flow-renderer";
import { useRecoilState, useRecoilValue } from "recoil";
import { createHandles } from "../../Helpers/helpers";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../Recoil/Selectors/selectors";

export function DoubleNumNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const connectedValue = useRecoilValue(connectedValueSelector(id))[0];
  const updateNodeInterals = useUpdateNodeInternals();

  useEffect(() => {
    const numToSave = connectedValue * 2;
    setState({ value: numToSave });
  }, [connectedValue]);

  return (
    <div className="custom-node">
      {createHandles("input", 1)}
      <h4>Double Number Pipe ||</h4>
      {createHandles("output", 1)}
    </div>
  );
}

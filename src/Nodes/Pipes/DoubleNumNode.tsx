import { useEffect } from "react";
import { Handle, Position, useUpdateNodeInternals } from "react-flow-renderer";
import { useRecoilState, useRecoilValue } from "recoil";
import { createHandles } from "../../Helpers/helpers";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import {
  connectedValueSelector,
  numberDisplaySelector,
} from "../../Recoil/Selectors/selectors";

export function DoubleNumNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const connectedValue = useRecoilValue(connectedValueSelector(id))[0];
  const updateNodeInterals = useUpdateNodeInternals();

  useEffect(() => {
    const numToSave = connectedValue * 2;
    setState({ value: numToSave });
  }, [connectedValue]);

  return (
    <div
      style={{
        height: "100px",
        border: "1px solid black",
        padding: "5px",
        borderRadius: "5px",
        backgroundColor: "#2a9d8f",
      }}
    >
      {createHandles("input", 1)}
      <h1>Double Number Pipe ||</h1>
      {createHandles("output", 1)}
    </div>
  );
}

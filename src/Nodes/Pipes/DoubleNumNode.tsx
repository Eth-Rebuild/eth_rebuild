import { useEffect } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import { numberDisplaySelector } from "../../Recoil/Selectors/selectors";

export function DoubleNumNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const connectedValue = useRecoilValue(numberDisplaySelector(id))[0];

  useEffect(() => {
    const numToSave = connectedValue * 2;
    setState({ Number: numToSave });
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
      <Handle type="target" position={Position.Top} />
      <h1>Double Number Pipe ||</h1>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

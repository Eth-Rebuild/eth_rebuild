import { Handle, Position } from "react-flow-renderer";
import {
  connectedNodesSelector,
  numberDisplaySelector,
} from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";

export function NumberDisplayNode({ id }) {
  const numberToDisplay = useRecoilValue(numberDisplaySelector(id));

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
      <h1>Number Display Node</h1>
      <h1>{numberToDisplay}</h1>
    </div>
  );
}

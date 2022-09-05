import { Handle, Position } from "react-flow-renderer";
import { stringDisplaySelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";

export function StringDisplayNode({ id }) {
  const stringToDisplay = useRecoilValue(stringDisplaySelector(id));

  return (
    <div
      style={{
        height: "100px",
        border: "1px solid black",
        padding: "5px",
        borderRadius: "5px",
        backgroundColor: "green",
      }}
    >
      <Handle type="target" position={Position.Top} />
      <h1>String Display Node</h1>
      <h1>{stringToDisplay}</h1>
    </div>
  );
}

import { Handle, Position } from "react-flow-renderer";
import { connectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { createHandles } from "../../Helpers/helpers";

export function BooleanDisplayNode({ id }) {
  const valueToDisplay = useRecoilValue(connectedValueSelector([id, "a"]));

  return (
    <div className="custom-node">
      <h4>Boolean Display Node</h4>
      {createHandles("input", 1)}
      <h4>{valueToDisplay ? "true" : "false"}</h4>
    </div>
  );
}

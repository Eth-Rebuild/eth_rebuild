import { Handle, Position } from "react-flow-renderer";
import { connectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { createHandles } from "../../Helpers/helpers";

export function StringDisplayNode({ id }) {
  const stringToDisplay = useRecoilValue(connectedValueSelector([id, "a"]));

  return (
    <div className="custom-node">
      <h4>String Display Node</h4>
      {createHandles("input", 1)}
      <h4>{stringToDisplay}</h4>
    </div>
  );
}

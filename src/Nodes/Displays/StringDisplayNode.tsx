import { Handle, Position } from "react-flow-renderer";
import { connectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { createHandles } from "../../Helpers/helpers";

export function StringDisplayNode({ id }) {
  const stringToDisplay = useRecoilValue(connectedValueSelector(id));

  return (
    <div className="custom-node">
      {createHandles("input", 1)}
      <h4>String Display Node</h4>
      <h4>{stringToDisplay}</h4>
    </div>
  );
}

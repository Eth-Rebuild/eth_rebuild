import { Handle, Position } from "react-flow-renderer";
import { connectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { createHandles } from "../../Helpers/helpers";

export function NumberDisplayNode({ id }) {
  const numberToDisplay = useRecoilValue(connectedValueSelector(id))[0];

  return (
    <div className="custom-node">
      {createHandles("input", 1)}
      <h4>Number Display Node</h4>
      <h4>{numberToDisplay}</h4>
    </div>
  );
}

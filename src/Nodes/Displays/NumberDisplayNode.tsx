import { Handle, Position } from "react-flow-renderer";
import { connectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { createHandles } from "../../Helpers/helpers";

export function NumberDisplayNode({ id }) {
  const numberToDisplay = useRecoilValue(connectedValueSelector(id))[0];

  return (
    <div className="custom-node">
      {createHandles("input", 1)}
      <h1>Number Display Node</h1>
      <h1>{numberToDisplay}</h1>
    </div>
  );
}

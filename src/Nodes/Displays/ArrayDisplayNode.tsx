import { Handle, Position } from "reactflow";
import { connectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { createHandles } from "../../Helpers/helpers";

export function ArrayDisplayNode({ id }) {
  const valuesToDisplay = useRecoilValue(connectedValueSelector([id, "a"]));

  return (
    <div className="custom-node display">
      <h4>Array Display Node</h4>
      {createHandles("input", 1)}
      <h4>{valuesToDisplay}</h4>
    </div>
  );
}

import { connectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { createHandles } from "../../Helpers/helpers";

export function ConditionalDisplayNode({ id }) {
  const a = useRecoilValue(connectedValueSelector([id, "a"]));
  const b = useRecoilValue(connectedValueSelector([id, "b"]));
  const c = useRecoilValue(connectedValueSelector([id, "c"]));

  return (
    <div className="custom-node">
      <h4>Conditional Display</h4>
      <h4>{b && c ? (a ? b : c) : "Invalid Input(s)"}</h4>
      {createHandles("input", 3, [
        "conditional",
        "display if true",
        "display if false",
      ])}
    </div>
  );
}

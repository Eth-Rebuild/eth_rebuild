import { connectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { Handles } from "../../Helpers/helpers";

export function ConditionalDisplayNode({ id }) {
  const a = useRecoilValue(connectedValueSelector([id, "a"]));
  const b = useRecoilValue(connectedValueSelector([id, "b"]));
  const c = useRecoilValue(connectedValueSelector([id, "c"]));

  return (
    <div className="custom-node display">
      <h4>Conditional Display</h4>
      <h4>{b && c ? (a ? b : c) : "Invalid Input(s)"}</h4>
      <Handles
        kind="input"
        count={3}
        id={id}
        types={{
          a: "any",
          b: "string",
          c: "string",
        }}
      />
    </div>
  );
}

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
        id={id}
        inputTypes={{
          a: "any",
          b: "string",
          c: "string",
        }}
        inputLabels={["Condition", "Display If True", "Display If False"]}
      />
    </div>
  );
}

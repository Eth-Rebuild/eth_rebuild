import { Handle, Position } from "reactflow";
import { connectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { Handles } from "../../Helpers/helpers";

export function BooleanDisplayNode({ id }) {
  const valueToDisplay = useRecoilValue(connectedValueSelector([id, "a"]));

  return (
    <div className="custom-node display">
      <h4>Boolean Display Node</h4>
      <Handles
        kind="input"
        count={1}
        id={id}
        types={{
          a: "any",
        }}
        labels={["Condition"]}
      />
      <h4>{valueToDisplay ? "true" : "false"}</h4>
    </div>
  );
}

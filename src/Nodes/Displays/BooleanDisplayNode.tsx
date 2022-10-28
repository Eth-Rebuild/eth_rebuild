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
        id={id}
        inputTypes={{
          a: "any",
        }}
        inputLabels={["Condition"]}
      />
      <h4>{valueToDisplay ? "true" : "false"}</h4>
    </div>
  );
}

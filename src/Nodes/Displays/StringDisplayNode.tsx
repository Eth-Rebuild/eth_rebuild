import { connectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { Handles } from "../../Helpers/helpers";

export function StringDisplayNode({ id }) {
  const stringToDisplay = useRecoilValue(connectedValueSelector([id, "a"]));
  return (
    <div className="custom-node display">
      <h4>String Display Node</h4>
      <Handles
        id={id}
        inputTypes={{
          a: "string",
        }}
      />
      <h4>{stringToDisplay}</h4>
    </div>
  );
}

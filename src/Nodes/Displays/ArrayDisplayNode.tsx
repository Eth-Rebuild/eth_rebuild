import { connectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { Handles } from "../../Helpers/helpers";

export function ArrayDisplayNode({ id }) {
  const valuesToDisplay = useRecoilValue(connectedValueSelector([id, "a"]));

  return (
    <div className="custom-node display">
      <h4>Array Display Node</h4>
      <Handles
        id={id}
        inputTypes={{
          a: "array",
        }}
        inputLabels={["Array"]}
      />
      <h4>{valuesToDisplay}</h4>
    </div>
  );
}

import { allConnectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { Handles } from "../../Helpers/helpers";

export function ConditionalDisplayNode({ id }) {
  const { a, b, c } = useRecoilValue(allConnectedValueSelector(id));

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

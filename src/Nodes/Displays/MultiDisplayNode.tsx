import { allConnectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { Handles } from "../../Helpers/helpers";

export function MultiDisplayNode({ id }) {
  const { a, b, c } = useRecoilValue(allConnectedValueSelector(id));

  console.log(a, b, c);
  return (
    <div className="custom-node display">
      <Handles
        id={id}
        inputTypes={{
          a: "any",
          b: "string",
          c: "string",
        }}
      />
      <h4>Multi Display Node</h4>
      <h4>{a}</h4>
      <h4>{b}</h4>
      <h4>{c}</h4>
    </div>
  );
}

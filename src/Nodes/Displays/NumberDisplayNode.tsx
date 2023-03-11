import { allConnectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { Handles } from "../../Helpers/helpers";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";

export function NumberDisplayNode({ id }) {
  const {a} = useRecoilValue(allConnectedValueSelector(id));

  return (
    <div className="custom-node display">
      <h4>Number Display Node</h4>
      <Handles
        id={id}
        inputTypes={{
          a: "number",
        }}
      />
      <h4>{a instanceof BigNumber ? "Ξ" + formatEther(a).substring(0, 6) : a ? a : ""}</h4>
    </div>
  );
}

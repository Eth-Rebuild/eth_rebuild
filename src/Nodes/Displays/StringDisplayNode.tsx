import { connectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { Handles } from "../../Helpers/helpers";
import { isBigNumberish } from "@ethersproject/bignumber/lib/bignumber";
import { BigNumber, utils } from "ethers";

export function StringDisplayNode({ id }) {
  const a = format(useRecoilValue(connectedValueSelector([id, "a"])));

  function format(str) {
    if (BigNumber.isBigNumber(str)) {
      return "Ξ" + utils.formatEther(str);
    } else if (typeof str === "string" || typeof str === "number") {
      return str;
    }
    return "Invalid Input";
  }

  return (
    <div className="custom-node display">
      <h4>String Display Node</h4>
      <Handles
        id={id}
        inputTypes={{
          a: "string",
        }}
      />
      <h4>{a}</h4>
    </div>
  );
}

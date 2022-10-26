import { connectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { Handles } from "../../Helpers/helpers";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";

export function NumberDisplayNode({ id }) {
  const num = useRecoilValue(connectedValueSelector([id, "a"]));

  return (
    <div className="custom-node display">
      <h4>Number Display Node</h4>
      <Handles
        kind="input"
        count={1}
        id={id}
        types={{
          a: "number",
        }}
      />
      <h4>{num instanceof BigNumber ? "Ξ" + formatEther(num).substring(0, 6) : num ? num : ""}</h4>
    </div>
  );
}

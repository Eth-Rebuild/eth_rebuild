import { connectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { createHandles } from "../../Helpers/helpers";
import { isAddress } from "ethers/lib/utils";
import { useRef } from "react";
import makeBlockie from "ethereum-blockies-base64";

export function AddressDisplayNode({ id }) {
  const a = useRecoilValue(connectedValueSelector([id, "a"]));
  const isValid = isAddress(a);

  return (
    <div className="custom-node">
      <h4>Address Display</h4>
      <span>
        {isValid ? (
          <img
            height={50}
            width={50}
            src={makeBlockie(a)}
            style={{ margin: "10px" }}
          />
        ) : (
          ""
        )}
        {isValid ? a : "Invalid Address"}
      </span>
      {createHandles("input", 1)}
    </div>
  );
}

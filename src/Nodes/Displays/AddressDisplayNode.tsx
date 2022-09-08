import { connectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { createHandles } from "../../Helpers/helpers";
import { isAddress } from "ethers/lib/utils";
import { useRef } from "react";
import makeBlockie from "ethereum-blockies-base64";

export function AddressDisplayNode({ id }) {
  const input = useRecoilValue(connectedValueSelector(id))[0];
  const isValid = isAddress(input);

  return (
    <div className="custom-node">
      <h4>Address Display</h4>
      <span>
        {/* <h4>{isValid ? input : "Invalid Address"}</h4> */}
        {isValid ? (
          <img
            height={50}
            width={50}
            src={makeBlockie(input)}
            style={{ margin: "10px" }}
          />
        ) : (
          ""
        )}
        {isValid ? input : "Invalid Address"}
      </span>
      {createHandles("input", 1)}
    </div>
  );
}

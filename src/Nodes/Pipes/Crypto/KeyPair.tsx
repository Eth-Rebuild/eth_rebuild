import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../../Recoil/Selectors/selectors";
import { createHandles } from "../../../Helpers/helpers";
import { SigningKey, computeAddress } from "ethers/lib/utils";
import { utils } from "ethers";

export function KeyPairNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const connectedValue = useRecoilValue(connectedValueSelector([id, "a"]));

  useEffect(() => {
    try {
      if (connectedValue) {
        const keyPair = new SigningKey(utils.formatBytes32String(connectedValue));
        setState({
          a: keyPair.publicKey,
          b: utils.parseBytes32String(keyPair.privateKey),
          c: computeAddress(keyPair.publicKey),
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [connectedValue]);

  return (
    <div className="custom-node pipe">
      <h4>Key Pair Pipe</h4>
      {createHandles("input", 1, ["Private Key"])}
      {createHandles("output", 3, ["Public Key", "Private Key", "Address"])}
    </div>
  );
}

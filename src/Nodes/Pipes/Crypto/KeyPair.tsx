import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { allConnectedValueSelector } from "../../../Recoil/Selectors/selectors";
import { Handles } from "../../../Helpers/helpers";
import { SigningKey, computeAddress } from "ethers/lib/utils";
import { utils } from "ethers";

export function KeyPairNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const {a} = useRecoilValue(allConnectedValueSelector(id));

  useEffect(() => {
    try {
      if (a) {
        const keyPair = new SigningKey(utils.formatBytes32String(a));
        setState((state) => ({ ...state, a: keyPair.publicKey, b: utils.parseBytes32String(keyPair.privateKey), c: computeAddress(keyPair.publicKey) }));
      }
    } catch (e) {
      console.error(e);
    }
  }, [a]);

  return (
    <div className="custom-node pipe">
      <h4>Key Pair Pipe</h4>
      <Handles
        id={id}
        inputTypes={{
          a: "string",
        }}
        inputLabels={["Private Key"]}
        outputTypes={{
          a: "string",
          b: "string",
          c: "string",
        }}
        outputLabels={["Public Key", "Private Key", "Address"]}
      />
    </div>
  );
}

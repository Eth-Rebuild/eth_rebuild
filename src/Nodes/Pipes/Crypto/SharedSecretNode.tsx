import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { allConnectedValueSelector } from "../../../Recoil/Selectors/selectors";
import { Handles } from "../../../Helpers/helpers";
import { utils } from "ethers";

export function SharedSecretNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const {a,b} = useRecoilValue(allConnectedValueSelector(id));

  const getSharedSecret = () => {
    const signingKey = new utils.SigningKey(utils.formatBytes32String(a));
    const sharedSecret = signingKey.computeSharedSecret(utils.formatBytes32String(b));
    setState((state) => ({ ...state, a: sharedSecret }));
  };

  useEffect(() => {
    if (a && b) {
      getSharedSecret();
    }
  }, [a, b]);

  return (
    <div className="custom-node pipe">
      <h4>Encrypt</h4>
      <Handles
        id={id}
        inputTypes={{
          a: "string",
          b: "string",
        }}
        inputLabels={["Your private key", "Their public key"]}
        outputTypes={{
          a: "string",
        }}
        outputLabels={["Shared Secret"]}
      />
    </div>
  );
}

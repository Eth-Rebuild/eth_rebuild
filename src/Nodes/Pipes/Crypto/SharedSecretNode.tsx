import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../../Recoil/Selectors/selectors";
import { createHandles } from "../../../Helpers/helpers";
import { utils } from "ethers";

export function SharedSecretNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const a = useRecoilValue(connectedValueSelector([id, "a"]));
  const b = useRecoilValue(connectedValueSelector([id, "b"]));

  const getSharedSecret = () => {
    const signingKey = new utils.SigningKey(utils.formatBytes32String(a));
    const sharedSecret = signingKey.computeSharedSecret(utils.formatBytes32String(b));
    setState({ a: sharedSecret });
  };

  useEffect(() => {
    if (a && b) {
      getSharedSecret();
    }
  }, [a, b]);

  return (
    <div className="custom-node pipe">
      <h4>Encrypt</h4>
      {createHandles("input", 2, ["Your private key", "Their public key"])}
      {createHandles("output", 1)}
    </div>
  );
}

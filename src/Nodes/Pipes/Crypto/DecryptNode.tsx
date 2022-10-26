import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../../Recoil/Selectors/selectors";
import { Handles } from "../../../Helpers/helpers";

export function DecryptNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const a = useRecoilValue(connectedValueSelector([id, "a"]));
  const b = useRecoilValue(connectedValueSelector([id, "b"]));

  const decrypt = async () => {
    // const privateKey = utils.formatBytes32String(a);
    // const encrypted = EthCrypto.cipher.parse(b);
    // const decrypted = await EthCrypto.decryptWithPrivateKey(privateKey, encrypted);
    // setState((state) => ({ ...state, a: decrypted }));
  };

  useEffect(() => {
    if (a && b) {
      decrypt();
    }
  }, [a, b]);

  return (
    <div className="custom-node pipe">
      <h4>Encrypt</h4>
      <Handles
        kind="input"
        count={2}
        id={id}
        types={{
          a: "string",
          b: "string",
        }}
        labels={["Private Key", "Encrypted"]}
      />
      <Handles
        kind="output"
        count={1}
        id={id}
        types={{
          a: "string",
        }}
      />
    </div>
  );
}

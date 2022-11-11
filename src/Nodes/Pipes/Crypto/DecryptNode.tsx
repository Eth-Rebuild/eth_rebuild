import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { allConnectedValueSelector } from "../../../Recoil/Selectors/selectors";
import { Handles } from "../../../Helpers/helpers";

export function DecryptNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const {a,b} = useRecoilValue(allConnectedValueSelector(id));

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
        id={id}
        inputTypes={{
          a: "string",
          b: "string",
        }}
        inputLabels={["Private Key", "Encrypted"]}
        outputTypes={{
          a: "string",
        }}
      />
    </div>
  );
}

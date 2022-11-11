import { ethers } from "ethers";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useProvider } from "wagmi";
import { Handles } from "../../../Helpers/helpers";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { allConnectedValueSelector } from "../../../Recoil/Selectors/selectors";

export function ProviderNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const { a, b, c } = useRecoilValue(allConnectedValueSelector(id));

  const wagmiProvider = useProvider();

  const getProvider = () => {
    const provider = !a ? wagmiProvider : new ethers.providers.JsonRpcProvider(a, b || 1);
    setState((prevState) => ({ ...prevState, a: provider }));
  };

  useEffect(() => {
    try {
      getProvider();
    } catch (e) {
      console.error(e);
    }
  }, [a, b]);

  return (
    <div className="custom-node pipe">
      <h4>Ethers Network Node</h4>
      <Handles
        id={id}
        inputTypes={{
          a: "string",
          b: "number",
        }}
        inputLabels={["Endpoint", "Network"]}
        outputTypes={{
          a: "object",
        }}
        outputLabels={["Provider"]}
      />
    </div>
  );
}

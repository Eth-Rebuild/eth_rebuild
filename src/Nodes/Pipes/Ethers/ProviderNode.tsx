import { ethers } from "ethers";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Handles } from "../../../Helpers/helpers";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../../Recoil/Selectors/selectors";

export function ProviderNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const a = useRecoilValue(connectedValueSelector([id, "a"]));
  const b = useRecoilValue(connectedValueSelector([id, "b"]));

  const getProvider = async () => {
    const provider = new ethers.providers.JsonRpcProvider(a || process.env.REACT_APP_ALCHEMY_ENDPOINT, b || 1);
    console.log(provider);
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
        kind="input"
        count={2}
        id={id}
        types={{
          a: "string",
          b: "number",
        }}
        labels={["Endpoint", "Network"]}
      />
      <Handles
        kind="output"
        count={1}
        id={id}
        types={{
          a: "object",
        }}
      />
    </div>
  );
}

import { ethers } from "ethers";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Handles } from "../../../Helpers/helpers";
import { blockNumberState, nodeDataState } from "../../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../../Recoil/Selectors/selectors";

export function GetBalanceNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const a = useRecoilValue(connectedValueSelector([id, "a"]));
  const b = useRecoilValue(connectedValueSelector([id, "b"]));
  const blockNumber = useRecoilValue(blockNumberState);

  const getBalance = async () => {
    if (a && b) {
      const balance = await a.getBalance(b);
      setState((prevState) => ({ ...prevState, a: balance }));
    }
  };

  useEffect(() => {
    try {
      getBalance();
    } catch (e) {
      console.error(e);
    }
  }, [a, b, blockNumber]);

  return (
    <div className="custom-node pipe">
      <h4>Get Balance</h4>
      <Handles
        id={id}
        inputTypes={{
          a: "object",
          b: "string",
        }}
        inputLabels={["Provider", "Address"]}
        outputTypes={{
          a: "number",
        }}
      />
    </div>
  );
}

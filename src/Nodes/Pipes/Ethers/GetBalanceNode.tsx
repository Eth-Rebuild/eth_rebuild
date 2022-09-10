import { ethers } from "ethers";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { createHandles } from "../../../Helpers/helpers";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../../Recoil/Selectors/selectors";

export function GetBalanceNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const a = useRecoilValue(connectedValueSelector([id, "a"]));
  const b = useRecoilValue(connectedValueSelector([id, "b"]));

  const getBalance = async () => {
    if (a && b) {
      const balance = await a.getBalance(b);
      setState({ a: balance });
    }
  };

  useEffect(() => {
    try {
      getBalance();
    } catch (e) {
      console.error(e);
    }
  }, [a, b]);

  return (
    <div className="custom-node">
      <h4>Get Balance</h4>
      {createHandles("input", 2, ["Provider", "Address"])}
      {createHandles("output", 1)}
    </div>
  );
}

import { ethers } from "ethers";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Handles } from "../../../Helpers/helpers";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { allConnectedValueSelector } from "../../../Recoil/Selectors/selectors";
import {useProvider} from "wagmi";

export function ContractNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const {a,b} = useRecoilValue(allConnectedValueSelector(id));
  const defaultProvider = useProvider();

  const getBalance = async () => {
    if (a && b) {
      // const provider = 
      // // const contract = new ethers.Contract()
      // const balance = await a.getBalance(b);
      // setState((prevState) => ({ ...prevState, a: balance }));
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
    <div className="custom-node pipe">
      <h4>Contract Node</h4>
      <Handles
        id={id}
        inputTypes={{
          a: "string",
          b: "object",
          c: "object"
        }}
        inputLabels={["Contract Address", "Contract ABI", "Optional: Provider"]}
        outputTypes={{
          a: "object",
        }}
        outputLabels={["Contract Object"]}
      />
    </div>
  );
}

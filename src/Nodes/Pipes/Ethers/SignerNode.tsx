import {ethers} from "ethers";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Handles } from "../../../Helpers/helpers";
import { blockNumberState, nodeDataState } from "../../../Recoil/Atoms/atoms";
import { allConnectedValueSelector } from "../../../Recoil/Selectors/selectors";

export function SignerNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const { a, b, c } = useRecoilValue(allConnectedValueSelector(id));

  const blockNumber = useRecoilValue(blockNumberState);

  const getBalance = async () => {
    if (a) {
      provider.si
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
      <h4>Transfer</h4>
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

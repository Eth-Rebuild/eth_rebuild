import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { allConnectedValueSelector } from "../../../Recoil/Selectors/selectors";
import { utils } from "ethers";
import { Handles } from "../../../Helpers/helpers";

export function HashNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const {a} = useRecoilValue(allConnectedValueSelector(id));

  useEffect(() => {
    try {
      if (a) {
        const hash = utils.keccak256(utils.toUtf8Bytes(a));
        setState((state) => ({ ...state, a: hash }));
      }
    } catch (e) {
      console.error(e);
    }
  }, [a]);

  return (
    <div className="custom-node pipe">
      <h4>Hash function Pipe</h4>
      <Handles
        id={id}
        inputTypes={{
          a: "string",
        }}
        inputLabels={["String"]}
        outputTypes={{
          a: "string",
        }}
      />
    </div>
  );
}

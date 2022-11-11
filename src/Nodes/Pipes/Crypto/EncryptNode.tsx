import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { allConnectedValueSelector } from "../../../Recoil/Selectors/selectors";
import { Handles } from "../../../Helpers/helpers";

export function EncryptNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const {a,b} = useRecoilValue(allConnectedValueSelector(id));

  const encrypt = async () => {};

  useEffect(() => {
    if (a && b) {
      encrypt();
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
        inputLabels={["Public Key", "String"]}
        outputTypes={{
          a: "string",
        }}
      />
    </div>
  );
}

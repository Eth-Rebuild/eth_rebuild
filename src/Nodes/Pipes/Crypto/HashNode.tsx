import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../../Recoil/Selectors/selectors";
import { utils } from "ethers";
import { Handles } from "../../../Helpers/helpers";

export function HashNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const connectedValue = useRecoilValue(connectedValueSelector([id, "a"]));

  useEffect(() => {
    try {
      if (connectedValue) {
        const hash = typeof connectedValue === "string" ? utils.keccak256(utils.toUtf8Bytes(connectedValue)) : utils.keccak256(connectedValue);
        setState((state) => ({ ...state, a: hash }));
      }
    } catch (e) {
      console.error(e);
    }
  }, [connectedValue]);

  return (
    <div className="custom-node pipe">
      <h4>Hash function Pipe</h4>
      <Handles
        kind="input"
        count={1}
        id={id}
        types={{
          a: "string",
        }}
        labels={["String"]}
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

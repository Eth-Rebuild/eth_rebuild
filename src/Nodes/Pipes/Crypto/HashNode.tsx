import { useEffect } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../../Recoil/Selectors/selectors";
import { utils } from "ethers";
import { createHandles } from "../../../Helpers/helpers";

export function HashNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const connectedValue = useRecoilValue(connectedValueSelector([id, "a"]));

  useEffect(() => {
    try {
      if (connectedValue) {
        const hash =
          typeof connectedValue === "string"
            ? utils.keccak256(utils.toUtf8Bytes(connectedValue))
            : utils.keccak256(connectedValue);
        setState({ a: hash });
      }
    } catch (e) {
      console.error(e);
    }
  }, [connectedValue]);

  return (
    <div className="custom-node">
      <h4>Hash function Pipe</h4>
      {createHandles("input", 1)}
      {createHandles("output", 1)}
    </div>
  );
}

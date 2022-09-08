import { useEffect } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../../Recoil/Selectors/selectors";
import { utils } from "ethers";
import { createHandles } from "../../../Helpers/helpers";

export function EncryptNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const connectedValue = useRecoilValue(connectedValueSelector(id))[0];

  useEffect(() => {
    try {
      if (connectedValue) {
        let hash;
        if (typeof connectedValue === "string") {
          hash = utils.keccak256(utils.toUtf8Bytes(connectedValue));
        } else {
          hash = utils.keccak256(connectedValue);
        }
        setState({ value: hash });
      } else {
        setState({ value: undefined });
      }
    } catch (e) {
      console.error(e);
    }
  }, [connectedValue]);

  return (
    <div className="custom-node">
      <h4>Encrypt</h4>
      {createHandles("input", 2, ["private key", "message"])}
      {createHandles("output", 1)}
    </div>
  );
}

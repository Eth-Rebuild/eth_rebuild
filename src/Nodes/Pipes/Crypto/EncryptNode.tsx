import { useEffect } from "react";
import { Handle, Position } from "react-flow-renderer";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../../Recoil/Selectors/selectors";
import { utils } from "ethers";

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
    <div
      style={{
        height: "100px",
        border: "1px solid black",
        padding: "5px",
        borderRadius: "5px",
        backgroundColor: "#2a9d8f",
      }}
    >
      <Handle type="target" position={Position.Top} />
      <h1>Hash function Pipe</h1>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

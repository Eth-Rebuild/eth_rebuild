import { Handle, Position } from "react-flow-renderer";
import { useRecoilState } from "recoil";
import { nodeDataState } from "../../Recoil/Atoms/atoms";

export function NumberInputNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));

  return (
    <div
      style={{
        height: "100px",
        border: "1px solid black",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      <input
        type="number"
        onChange={(e) => {
          setState({ Number: e.target.value, ...state });
        }}
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

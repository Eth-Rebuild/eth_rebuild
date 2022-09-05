import { Handle, Position } from "react-flow-renderer";
import { useRecoilState } from "recoil";
import { nodeDataState } from "../../Recoil/Atoms/atoms";

export function StringInputNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));

  return (
    <div
      style={{
        height: "100px",
        border: "1px solid black",
        padding: "5px",
        borderRadius: "5px",
        backgroundColor: "green",
      }}
    >
      <input
        type="string"
        defaultValue=""
        onChange={(e) => {
          setState({ String: e.target.value });
        }}
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

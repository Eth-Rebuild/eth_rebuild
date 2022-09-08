import { Handle, Position } from "react-flow-renderer";
import { useRecoilState } from "recoil";
import { createHandles } from "../../Helpers/helpers";
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
        backgroundColor: "#2a9d8f",
      }}
    >
      <input
        type="string"
        defaultValue=""
        onChange={(e) => {
          setState({ value: e.target.value });
        }}
      />
      <h1>String Input</h1>
      {createHandles("output", 1)}
    </div>
  );
}

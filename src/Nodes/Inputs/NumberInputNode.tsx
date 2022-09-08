import { Handle, Position } from "react-flow-renderer";
import { useRecoilState } from "recoil";
import { createHandles } from "../../Helpers/helpers";
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
        backgroundColor: "#2a9d8f",
      }}
    >
      <input
        type="number"
        defaultValue={0}
        onChange={(e) => {
          setState({
            value: e.target.valueAsNumber,
          });
        }}
      />
      <h1>Number Input</h1>
      {createHandles("output", 1)}
    </div>
  );
}

import { Handle, Position } from "react-flow-renderer";
import { useRecoilState } from "recoil";
import { createHandles } from "../../Helpers/helpers";
import { nodeDataState } from "../../Recoil/Atoms/atoms";

export function StringInputNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));

  return (
    <div className="custom-node">
      <h4>String Input</h4>
      <input
        type="string"
        defaultValue=""
        onChange={(e) => {
          setState({ a: e.target.value });
        }}
      />
      {createHandles("output", 1)}
    </div>
  );
}

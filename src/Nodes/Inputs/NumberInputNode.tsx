import { Handle, Position } from "react-flow-renderer";
import { useRecoilState } from "recoil";
import { createHandles } from "../../Helpers/helpers";
import { nodeDataState } from "../../Recoil/Atoms/atoms";

export function NumberInputNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));

  return (
    <div className="custom-node">
      <h4>Number Input</h4>
      <input
        type="number"
        onChange={(e) => {
          setState({
            a: e.target.valueAsNumber || 0,
          });
        }}
      />
      {createHandles("output", 1)}
    </div>
  );
}

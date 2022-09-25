import { useRecoilState } from "recoil";
import { createHandles } from "../../Helpers/helpers";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import { Input } from "antd";

export function StringInputNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));

  return (
    <div className="custom-node input">
      <h4>String Input</h4>
      <Input
        className="input"
        onChange={(e) => setState({ a: e.target.value })}
      />
      {createHandles("output", 1)}
    </div>
  );
}

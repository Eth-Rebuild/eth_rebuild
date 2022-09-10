import { useRecoilState } from "recoil";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import { Button } from "antd";
import { createHandles } from "../../Helpers/helpers";

export function ButtonInputNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));

  return (
    <div className="custom-node">
      <h4>Button Input</h4>
      <Button
        className="input"
        type="primary"
        onClick={() => {
          setState({ a: state["value"] + 1 || 1 });
        }}
      >
        Click Me
      </Button>
      {createHandles("output", 1)}
    </div>
  );
}

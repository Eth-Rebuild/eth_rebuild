import { Handle, Position } from "react-flow-renderer";
import { useRecoilState } from "recoil";
import { createHandles } from "../../Helpers/helpers";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import { InputNumber } from "antd";

export function NumberInputNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));

  const onChange = (value: number) => {
    setState({ a: value });
  };

  return (
    <div className="custom-node">
      <h4>Number Input</h4>
      <InputNumber onChange={onChange} defaultValue={0} />
      {createHandles("output", 1)}
    </div>
  );
}

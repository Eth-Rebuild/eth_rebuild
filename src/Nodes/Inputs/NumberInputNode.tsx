import { Handle, Position } from "reactflow";
import { useRecoilState } from "recoil";
import { Handles } from "../../Helpers/helpers";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import { InputNumber } from "antd";

export function NumberInputNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));

  const onChange = (value: number) => {
    setState((state) => ({ ...state, a: value }));
  };

  return (
    <div className="custom-node input">
      <h4>Number Input</h4>
      <InputNumber className="input" onChange={onChange} defaultValue={0} />
      <Handles
        kind="output"
        count={1}
        id={id}
        types={{
          a: "number",
        }}
      />
    </div>
  );
}

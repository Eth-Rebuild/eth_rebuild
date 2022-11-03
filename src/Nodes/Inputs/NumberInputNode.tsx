import { useRecoilState, useRecoilValue } from "recoil";
import { Handles } from "../../Helpers/helpers";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import { InputNumber } from "antd";
import { isAddress } from "ethers/lib/utils";

export function NumberInputNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));

  const onChange = (value: number) => {
    setState((state) => ({ ...state, a: value }));
  };

  return (
    <div className="custom-node input">
      <h4>Number Input</h4>
      <InputNumber className="input" value={state ? state.a : null} onChange={onChange} defaultValue={0} />
      <Handles
        id={id}
        outputTypes={{
          a: "number",
        }}
      />
    </div>
  );
}

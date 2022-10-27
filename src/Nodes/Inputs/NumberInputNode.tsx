import { Connection, Handle, Position } from "reactflow";
import { useRecoilState, useRecoilValue } from "recoil";
import { Handles } from "../../Helpers/helpers";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import { InputNumber } from "antd";
import { useEffect } from "react";
import { ConnectOpts } from "net";
import { validNodeConnectionSelector } from "../../Recoil/Selectors/selectors";

export function NumberInputNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));

  const onChange = (value: number) => {
    setState((state) => ({ ...state, a: value }));
  };

  useEffect(() => {
    console.log(state);
  }, [state]);
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

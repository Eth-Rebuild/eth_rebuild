import { useRecoilState } from "recoil";
import { Handles } from "../../Helpers/helpers";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import { Input } from "antd";
import { isAddress } from "ethers/lib/utils";
import makeBlockie from "ethereum-blockies-base64";
const {TextArea} = Input;

export function StringInputNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const isValid = isAddress(state?.["a"]);

  return (
    <div className="custom-node input">
      <h4>String Input</h4>
      {isValid && (
        <img
          style={{
            justifySelf: "flex-end",
          }}
          height={30}
          width={30}
          src={makeBlockie(state.a)}
        />
      )}
        <TextArea className="input" value={state ? state.a : null} onChange = {(e) => setState((oldState:any) => ({ ...oldState, a: e.target.value }))} autoSize={true} />
      <Handles
        id={id}
        outputTypes={{
          a: "string",
        }}
      />
    </div>
  );
}

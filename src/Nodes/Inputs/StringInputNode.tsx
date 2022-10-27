import { useRecoilState } from "recoil";
import { Handles } from "../../Helpers/helpers";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import { Input } from "antd";
import { isAddress } from "ethers/lib/utils";
import makeBlockie from "ethereum-blockies-base64";

export function StringInputNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const isValid = isAddress(state?.["a"]);

  return (
    <div className="custom-node input">
      <h4>String Input</h4>
      {isValid ? (
        <img
          style={{
            justifySelf: "flex-end",
          }}
          height={30}
          width={30}
          src={makeBlockie(state.a)}
        />
      ) : (
        ""
      )}
      <Input className="input" onChange={(e) => setState((oldState) => ({ ...oldState, a: e.target.value }))} />
      <Handles
        kind="output"
        count={1}
        id={id}
        types={{
          a: "string",
        }}
      />
    </div>
  );
}

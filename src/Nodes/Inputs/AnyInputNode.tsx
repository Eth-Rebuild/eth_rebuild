import { useRecoilState } from "recoil";
import { Handles } from "../../Helpers/helpers";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import { Input } from "antd";

export function AnyInputNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));

  function safeEval(str: string) {
    try {
      if (!str.includes("{") || !str.includes("[")) {
        const isNumber = /^\d+$/.test(str);
        return isNumber ? Number(str) : str;
      } else {
        return Function('"use strict";return (' + str + ")")();
      }
    } catch (e) {
      return undefined;
    }
  }

  return (
    <div className="custom-node input">
      <h4>Any Input</h4>
      <Input className="input" value={state ? state.a : null} onChange={(e) => setState((oldState) => ({ ...oldState, a: safeEval(e.target.value) }))} />
      <Handles
        id={id}
        outputTypes={{
          a: "any",
        }}
      />
    </div>
  );
}

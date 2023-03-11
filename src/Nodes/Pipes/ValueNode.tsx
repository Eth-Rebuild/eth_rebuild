import { useEffect, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { Handles } from "../../Helpers/helpers";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import { Input } from "antd";

export function ValueNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const [displayInput, setDisplayInput] = useState(false);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (displayInput) {
      inputRef.current.focus();
    }
  }, [displayInput]);

  return (
    <div
      className="custom-node pipe"
      onDoubleClick={() => setDisplayInput(true)}
      onBlur={() => setDisplayInput(false)}
    >
      {!displayInput && <h4>{state.value || "Default Project Name"}</h4>}
      {displayInput && (
        <Input
          value={state.value}
          ref={inputRef}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setDisplayInput(false);
            }
          }}
          onChange={(e) => {
            setState((old) => ({ ...old, value: e.target.value }));
          }}
        />
      )}
      <Handles
        id={id}
        inputLabels={["-> Gets value from", "<- Provides profit to"]}
        inputTypes={{
          a: "any",
          b: "any",
        }}
        outputLabels={["Provides value to ->", "Gets profit from <-"]}
        outputTypes={{
          a: "any",
          b: "any",
        }}
      />
    </div>
  );
}

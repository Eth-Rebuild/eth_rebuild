import { useEffect, useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Handles } from "../../Helpers/helpers";
import { nodeDataState, nodeNameState } from "../../Recoil/Atoms/atoms";
import { AutoComplete } from "antd";

export function ValueNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const [displayModal, setDisplayModal] = useState(false);
  const options = useRecoilValue(nodeNameState);
  const [value, setValue] = useState(state.name);
  const [nodeOptions, setNodeOptions] = useState<any[]>();

  useEffect(() => {
    if (!value) return;
    setNodeOptions(
      options
        .filter((o) => o.toLowerCase().includes(value.toLowerCase()))
        .map((item) => ({ value: item }))
    );
  }, [value]);

  function onSelect(value) {
    setState((old) => ({ ...old, name: value }));
    setDisplayModal(false);
  }

  function onChange(value) {
    setValue(value);
  }

  return (
    <div
      className="custom-node pipe"
      onDoubleClick={() => {
        setDisplayModal(true);
      }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      onBlur={() => setDisplayModal(false)}
    >
      {!displayModal && <h4>{state.name || "Default Project Name"}</h4>}
      {displayModal && (
        <AutoComplete
          style={{
            width: "100%",
          }}
          autoFocus
          placeholder="Select Project"
          options={nodeOptions}
          onSelect={onSelect}
          value={value}
          onChange={onChange}
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

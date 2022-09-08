import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { nodeDataState } from "../../../Recoil/Atoms/atoms";
import { connectedValueSelector } from "../../../Recoil/Selectors/selectors";
import { createHandles, getDataSources } from "../../../Helpers/helpers";

export function EncryptNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));
  const connectedValue = useRecoilValue(connectedValueSelector([id, "a"]))[0];
  const values = getDataSources(connectedValue, 2);

  useEffect(() => {
    setState({ a: "Pretend this is encrypted ;)" });
  }, [values]);

  return (
    <div className="custom-node">
      <h4>Encrypt</h4>
      {createHandles("input", 2, ["private key", "message"])}
      {createHandles("output", 1)}
    </div>
  );
}

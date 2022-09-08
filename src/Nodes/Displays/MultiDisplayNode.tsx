import { Handle, Position } from "react-flow-renderer";
import { connectedNodeIdDataSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { Row, Col } from "antd";
import { useEffect } from "react";
import { defaultNodeStyleState } from "../../Recoil/Atoms/atoms";
import { createHandles } from "../../Helpers/helpers";

export function MultiDisplayNode({ id }) {
  const a = useRecoilValue(connectedNodeIdDataSelector([id, "a"]))[0];
  const b = useRecoilValue(connectedNodeIdDataSelector([id, "b"]))[0];
  const c = useRecoilValue(connectedNodeIdDataSelector([id, "c"]))[0];

  const style = useRecoilValue(defaultNodeStyleState);

  useEffect(() => {
    console.log("a", a);
    console.log("b", b);
    console.log("c", c);
  }, [a, b, c]);

  return (
    <div style={style}>
      {createHandles("input", 3)}
      <h1>Multi Display Node</h1>
      <h1>{a ? a["value"] : ""}</h1>
      <h1>{b ? b["value"] : ""}</h1>
      <h1>{c ? c["value"] : ""}</h1>
    </div>
  );
}

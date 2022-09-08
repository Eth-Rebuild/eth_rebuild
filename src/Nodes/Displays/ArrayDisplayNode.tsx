import { Handle, Position } from "react-flow-renderer";
import { connectedValueSelector } from "../../Recoil/Selectors/selectors";
import { useRecoilValue } from "recoil";
import { createHandles } from "../../Helpers/helpers";

export function ArrayDisplayNode({ id }) {
  const valuesToDisplay = useRecoilValue(connectedValueSelector(id));

  return (
    <div
      style={{
        height: "100px",
        border: "1px solid black",
        padding: "5px",
        borderRadius: "5px",
        backgroundColor: "#2a9d8f",
      }}
    >
      {createHandles("input", 1)}
      <h1>Array Display Node</h1>
      <h1>{valuesToDisplay}</h1>
    </div>
  );
}

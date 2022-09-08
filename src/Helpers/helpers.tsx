import { Handle, Position } from "react-flow-renderer";
import { useRecoilValue } from "recoil";
import { connectedValueSelector } from "../Recoil/Selectors/selectors";

export const alphaArray = "abcdefghijklmnopqrstuvwxyz".split("");

export function createHandles(kind: string, count: number, labels?: string[]) {
  return Array.from(Array(count)).map((_, index) => (
    <div key={index}>
      <Handle
        type={kind === "input" ? "target" : "source"}
        position={kind === "input" ? Position.Left : Position.Right}
        style={{
          top: `${(index + 1) * 30 + 20}px`,
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          backgroundColor: "#e9c46a",
          cursor: "pointer",
          border: "1px solid #2a9d8f",
          display: "inline-block",
        }}
        id={alphaArray[index]}
      />
      <div
        style={{
          position: "absolute",
          top: `${(index + 1) * 30 + 9}px`,
        }}
      >
        {labels ? labels[index] : ""}
      </div>
    </div>
  ));
}

export function getDataSources(
  connectedValue: any[] | undefined,
  count: number
) {
  if (!connectedValue) return undefined;
  if (connectedValue.length >= count - 1) {
    return connectedValue.slice(0, count);
  }
}

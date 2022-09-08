import { Handle, Position } from "react-flow-renderer";

export const alphaArray = "abcdefghijklmnopqrstuvwxyz".split("");

export function createHandles(kind: string, count: number, labels?: string[]) {
  return Array.from(Array(count)).map((_, index) => (
    <div>
      <Handle
        key={index}
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

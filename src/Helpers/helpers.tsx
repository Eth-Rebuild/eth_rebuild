import { Handle, Position } from "react-flow-renderer";

export const alphaArray = "abcdefghijklmnopqrstuvwxyz".split("");

export function createHandles(kind: string, count: number, labels?: string[]) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {Array.from(Array(count)).map((_, index) => (
        <div
          key={kind + index.toString()}
          style={{
            display: "flex",
          }}
        >
          <Handle
            type={kind === "input" ? "target" : "source"}
            position={kind === "input" ? Position.Left : Position.Right}
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              backgroundColor: kind === "input" ? "red" : "green",
              cursor: "pointer",
              border: "1px solid #2a9d8f",
              position: "relative",
              order: 2,
            }}
            id={alphaArray[index]}
          />
          <span
            style={{
              order: kind === "input" ? 3 : 1,
            }}
          >
            {labels ? labels[index] : ""}
          </span>
        </div>
      ))}
    </div>
  );
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

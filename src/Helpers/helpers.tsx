import { Handle, Position } from "react-flow-renderer";

export const alphaArray = "abcdefghijklmnopqrstuvwxyz".split("");

export function createHandles(kind: string, count: number, labels?: string[]) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: kind === "input" ? "start" : "end",
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
            type={kind === "input" ? "target" : "source"} // @dev I really just don't like the word target and source, so im using input and output
            position={kind === "input" ? Position.Left : Position.Right}
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              backgroundColor: kind === "input" ? "#DB79FF" : "#6FCF97",
              cursor: "pointer",
              border: "1px solid #ffffff",
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

export function getDataSources(connectedValue: any[] | undefined, count: number) {
  if (!connectedValue) return undefined;
  if (connectedValue.length >= count - 1) {
    return connectedValue.slice(0, count);
  }
}

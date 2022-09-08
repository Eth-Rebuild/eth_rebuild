import { Handle, Position } from "react-flow-renderer";

export const alphaArray = "abcdefghijklmnopqrstuvwxyz".split("");

export function createHandles(kind: string, count: number) {
  return Array.from(Array(count)).map((_, index) => (
    <Handle
      key={index}
      type={kind === "input" ? "target" : "source"}
      position={kind === "input" ? Position.Left : Position.Right}
      style={{
        width: 15,
        height: 15,
        top: `${(index + 1) * 30}px`,
      }}
      id={alphaArray[index]}
    />
  ));
}

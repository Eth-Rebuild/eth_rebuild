import React from "react";
import { getBezierPath, Position, EdgeLabelRenderer } from "reactflow";

interface CustomEdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position | undefined;
  targetPosition: Position | undefined;
  style?: React.CSSProperties;
  data?: any;
  markerEnd?: string;
}

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data = {},
  markerEnd = undefined,
}: CustomEdgeProps) {
  console.log("rendering custom edge");
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd || undefined}
      />
      <EdgeLabelRenderer></EdgeLabelRenderer>
    </>
  );
}

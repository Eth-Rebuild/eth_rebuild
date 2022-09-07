import { atom, atomFamily, selectorFamily } from "recoil";
import {
  MultiDisplayNode,
  NumberDisplayNode,
  StringDisplayNode,
} from "../../Nodes/Displays";
import {
  DoubleNumNode,
  DynamicNode,
  StringConcatNode,
} from "../../Nodes/Pipes";
import { NumberInputNode, StringInputNode } from "../../Nodes/Inputs";
import { Edge, Node } from "react-flow-renderer";

export const nodeTypesState = atom({
  key: "nodeTypes",
  default: {
    // inputs
    numberInputNode: NumberInputNode,
    stringInputNode: StringInputNode,

    // pipes
    doubleNumNode: DoubleNumNode,
    stringConcatNode: StringConcatNode,
    dynamicNode: DynamicNode,

    // displays
    numberDisplayNode: NumberDisplayNode,
    stringDisplayNode: StringDisplayNode,
    multiDisplayNode: MultiDisplayNode,
  },
});

export const nodeTypesPrettyState = atom({
  key: "nodeTypesPretty",
  default: {
    // inputs
    numberInputNode: "Number Input",
    stringInputNode: "String Input",

    // pipes
    doubleNumNode: "Double Number",
    stringConcatNode: "String Concat",
    dynamicNode: "Dynamic Node",

    // displays
    numberDisplayNode: "Number Display",
    stringDisplayNode: "String Display",
    multiDisplayNode: "Multi Display",
  },
});

export const nodeState = atom<Array<Node>>({
  key: "nodes",
  default: [],
});

export const edgeState = atom<Array<Edge>>({
  key: "edges",
  default: [],
});

export const nodeDataState = atomFamily<object, string>({
  key: "nodeDataState",
  default: selectorFamily({
    key: "nodeDataState/Default",
    get:
      (id) =>
      ({ get }) => {
        const nodes = get(nodeState);
        return nodes.find((n) => n.id === id) || {};
      },
  }),
});

export const cursorPositionState = atom({
  key: "cursorPosition",
  default: { x: 0, y: 0 },
});

export const defaultNodeStyleState = atom({
  key: "defaultNodeStyle",
  default: {
    background: "#D1D5DB",
    color: "#1F2937",
    border: "1px solid #9CA3AF",
    padding: 10,
    borderRadius: 4,
  },
});

export const defaultHandleStyleState = atom({
  key: "defaultHandleStyle",
  default: {
    background: "#D1D5DB",
    border: "1px solid #9CA3AF",
    borderRadius: 4,
    width: 14,
    height: 14,
    top: -7,
    left: -7,
    position: "absolute",
    cursor: "pointer",
  },
});

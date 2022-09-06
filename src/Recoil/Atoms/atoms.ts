import { atom, atomFamily, selectorFamily } from "recoil";
import { NumberDisplayNode, StringDisplayNode } from "../../Nodes/Displays";
import { DoubleNumNode, StringConcatNode } from "../../Nodes/Pipes";
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

    // displays
    numberDisplayNode: NumberDisplayNode,
    stringDisplayNode: StringDisplayNode,
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

    // displays
    numberDisplayNode: "Number Display",
    stringDisplayNode: "String Display",
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

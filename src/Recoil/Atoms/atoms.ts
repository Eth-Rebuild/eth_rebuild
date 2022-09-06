import { atom, atomFamily, selectorFamily } from "recoil";
import { NumberDisplayNode, StringDisplayNode } from "../../Nodes/Displays";
import { DoubleNumNode, StringConcatNode } from "../../Nodes/Pipes";
import { NumberInputNode, StringInputNode } from "../../Nodes/Inputs";

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

export const nodeState = atom({
  key: "nodes",
  default: [
    {
      id: "1",
      type: "numberInputNode",
      data: {} as any,
      position: { x: 250, y: 25 },
    },
    {
      id: "2",
      type: "doubleNumNode",
      data: {},
      position: { x: 250, y: 225 },
    },
    {
      id: "3",
      type: "doubleNumNode",
      data: {},
      position: { x: 250, y: 425 },
    },
    {
      id: "4",
      type: "numberDisplayNode",
      data: {},
      position: { x: 250, y: 625 },
    },
    {
      id: "5",
      type: "stringInputNode",
      data: {},
      position: { x: 450, y: 25 },
    },
    {
      id: "6",
      type: "stringInputNode",
      data: {},
      position: { x: 850, y: 25 },
    },
    {
      id: "7",
      type: "stringConcatNode",
      data: {},
      position: { x: 650, y: 225 },
    },
    {
      id: "8",
      type: "stringDisplayNode",
      data: {},
      position: { x: 650, y: 425 },
    },
  ],
});

export const edgeState = atom({
  key: "edges",
  //TODO: add a type for edge state
  default: [
    {
      id: "e1-2",
      source: "1",
      target: "2",
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
    },
    {
      id: "e5-7",
      source: "5",
      target: "7",
    },
    {
      id: "e6-7",
      source: "6",
      target: "7",
    },
    {
      id: "e7-8",
      source: "7",
      target: "8",
    },
  ],
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

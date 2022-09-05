import { atom, atomFamily, selectorFamily } from "recoil";
import { NumberDisplayNode } from "../../Nodes/Displays/NumberDisplayNode";
import { DoubleNumNode } from "../../Nodes/Pipes/DoubleNumNode";
import { NumberInputNode } from "../../Nodes/Inputs/NumberInputNode";

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
      position: { x: 450, y: 25 },
    },
    {
      id: "3",
      type: "numberDisplayNode",
      data: { label: "Output Node" },
      position: { x: 450, y: 25 },
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
  ],
});

export const nodeTypesState = atom({
  key: "nodeTypes",
  default: {
    numberInputNode: NumberInputNode,
    doubleNumNode: DoubleNumNode,
    numberDisplayNode: NumberDisplayNode,
  },
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

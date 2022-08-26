import { atom, atomFamily, selectorFamily } from "recoil";
import { AdditionNode } from "../Nodes/AdditionNode";
import { SampleNode } from "../Nodes/SampleNode";

export const nodeState = atom({
  key: "nodes",
  default: [
    {
      id: "1",
      type: "input",
      data: { label: "Input Node" } as any,
      position: { x: 250, y: 25 },
    },
    {
      id: "2",
      type: "output",
      data: { label: "Output Node" },
      position: { x: 450, y: 25 },
    },
  ],
});

export const edgeState = atom({
  key: "edges",
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
    sampleNode: SampleNode,
    additionNode: AdditionNode,
  },
});

export const nodeDataState = atomFamily({
  key: "@nodeData",
  default: selectorFamily({
    key: "@nodeData/Default",
    get:
      (param) =>
      ({ get }) => {
        return {
          id: String(get(nodeState).length),
        };
      },
  }),
});

// export const nodeDataSelector = selectorFamily<object, string>({
//   key: "@nodeData",
//   get:
//     (id) =>
//     ({ get }) => {
//       return {};
//     },
// });

export const activeConnectionsSelector = selectorFamily<number, string>({
  key: "@activeConnections",

  get:
    (id) =>
    ({ get }) => {
      return get(edgeState).filter((item) => item.target === id).length;
    },
});

export const connectedNodesSelector = selectorFamily<
  Array<string | undefined>,
  string
>({
  key: "@connectedNodes",

  get:
    (id) =>
    ({ get }) => {
      return get(edgeState).map((item) => {
        if (item.target === id) return item.source;
      });
    },
});

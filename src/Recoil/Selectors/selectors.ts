import { selectorFamily } from "recoil";
import { edgeState, nodeDataState } from "../Atoms/atoms";

export const activeConnectionsSelector = selectorFamily<number, string>({
  key: "@activeConnections",

  get:
    (id) =>
    ({ get }) => {
      return get(edgeState).filter((item) => item.target === id).length;
    },
});

export const connectedNodesSelector = selectorFamily<Array<string>, string>({
  key: "@connectedNodes",
  get:
    (id) =>
    ({ get }) => {
      const connectedNodes = get(edgeState).filter(
        (item) => item.target === id
      );
      return connectedNodes.map((item) => item.source);
    },
});

export const connectedNodesDataSelector = selectorFamily<Array<object>, string>(
  {
    key: "@connectedNodesData",

    get:
      (id) =>
      ({ get }) => {
        const connectedNodes = get(connectedNodesSelector(id));
        return connectedNodes.map((nodeId) => get(nodeDataState(nodeId)));
      },
  }
);

export const numberDisplaySelector = selectorFamily<Array<number>, string>({
  key: "@displaySelector",

  get:
    (id) =>
    ({ get }) => {
      const connectedNodesData = get(connectedNodesDataSelector(id));
      return connectedNodesData.map((item) => item["Number"]);
    },
});

// export const additionSelector = selectorFamily<number, string>({
//   key: "@additionSelector",

//   get:
//     (id) =>
//     ({ get }) => {
//       const connectedNodesData = get(connectedNodesDataSelector(id));
//       return connectedNodesData.reduce((acc, item) => acc + item["Number"], 0);
//     },
// });

// export const multiplicationSelector = selectorFamily<number, string>({
//   key: "@multiplicationSelector",

//   // for now we are just multiplying every number by 2
//   get:
//     (id) =>
//     ({ get }) => {
//       const connectedNodesData = get(connectedNodesDataSelector(id));
//       return connectedNodesData.reduce(
//         (acc, item) => acc + 2 * item["Number"],
//         1
//       );
//     },

//   set:
//     (id) =>
//     ({ set, get }) => {
//       const multipledValue = get(multiplicationSelector(id));
//       set(nodeDataState(id), { Number: multipledValue });
//     },
// });

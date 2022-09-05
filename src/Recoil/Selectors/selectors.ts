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

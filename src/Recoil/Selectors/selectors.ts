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

export const connectedNodeIdSelector = selectorFamily<
  Array<string>,
  Array<string>
>({
  key: "@connectedNodes",
  get:
    ([nodeId, handleId]) =>
    ({ get }) => {
      const connectedNodes = get(edgeState).filter(
        (item) => item.target === nodeId && item.targetHandle === handleId
      );
      return connectedNodes.map((item) => item.source);
    },
});

export const connectedNodeIdDataSelector = selectorFamily<
  Array<object>,
  Array<string>
>({
  key: "@connectedNodes",
  get:
    ([nodeId, handleId]) =>
    ({ get }) => {
      const connectedNodes = get(connectedNodeIdSelector([nodeId, handleId]));
      return connectedNodes.map((nodeId) => get(nodeDataState(nodeId)));
    },
});

export const numberDisplaySelector = selectorFamily<Array<number>, string>({
  key: "@displaySelector",

  get:
    (id) =>
    ({ get }) => {
      const connectedNodesData = get(connectedNodesDataSelector(id));
      return connectedNodesData.map((item) => item["Number"]);
    },
});

export const stringDisplaySelector = selectorFamily<Array<string>, string>({
  key: "@displaySelector",

  get:
    (id) =>
    ({ get }) => {
      const connectedNodesData = get(connectedNodesDataSelector(id));
      return connectedNodesData.map((item) => item["String"]);
    },
});

export const connectedValueSelector = selectorFamily<Array<any>, string>({
  key: "@displaySelector",

  get:
    (id) =>
    ({ get }) => {
      const connectedNodesData = get(connectedNodesDataSelector(id));
      return connectedNodesData.map((item) => item["value"]);
    },
});

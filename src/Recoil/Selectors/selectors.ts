import { selectorFamily } from "recoil";
import { edgeState, nodeDataState } from "../Atoms/atoms";

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

// @params:
//  - id: string
// - handleId: string

// explanation of this selector:
// 1) get all the connected nodes ids
// 2) filter through the edges to find a node that: source === connectedNode && targetHandle === handleId
// 3) return the sourceHandle of that edge and the source
// 4) return get(nodeData(source))[sourceHandle]
// 5) else return undefined

export const connectedValueSelector = selectorFamily<any, [string, string]>({
  key: "@displaySelector",
  dangerouslyAllowMutability: true,

  get:
    ([id, handleId]) =>
    ({ get }) => {
      const edges = get(edgeState).filter((edge) => edge.target === id);
      const connectedHandleState = edges.find(
        (edge) => edge.targetHandle === handleId
      );
      if (connectedHandleState) {
        const nodeData = get(nodeDataState(connectedHandleState.source));
        return nodeData[
          connectedHandleState.sourceHandle
            ? connectedHandleState.sourceHandle
            : "default"
        ];
      } else {
        return undefined;
      }
    },
});

import { selectorFamily } from "recoil";
import { edgeState, nodeDataState, nodeState } from "../Atoms/atoms";

export const connectedNodesSelector = selectorFamily<Array<string>, string>({
  key: "@connectedNodes",
  get:
    (id) =>
    ({ get }) => {
      const connectedNodes = get(edgeState).filter((item) => item.target === id);
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
      // Conencted Node to this handleId
      const edge = get(edgeState).filter((edge) => edge.target === id && edge.targetHandle === handleId)[0];
      if (edge && edge.sourceHandle) {
        const nodeData = get(nodeDataState(edge.source));
        return nodeData?.[edge.sourceHandle];
      } else {
        return undefined;
      }
    },
});

// @notice used to find all the valid connections for each handle on a node
/* @returns an object like this
  {
    a: ValidNode[]
    b: ValidNode[]
    ..etc
  }
 */
export const validNodeConnectionSelector = selectorFamily<object, string>({
  key: "@validNodeConnectionSelector",
  get:
    (id) =>
    ({ get }) => {
      const nodeData = get(nodeDataState(id));
      let handleToConnections = {};
      Object.keys(nodeData).forEach((key) => {
        if (key !== "outputTypes" && key !== "inputTypes") {
          handleToConnections[key] = get(validHandleConnectionSelector([id, key]));
        }
      });
      return handleToConnections;
    },
});

// @notice used to find all valid connections for the type of a node's handle
export const validHandleConnectionSelector = selectorFamily<object, [string, string]>({
  key: "@validHandleConnectionSelector",

  get:
    ([id, handleId]) =>
    ({ get }) => {
      const type = get(nodeDataState(id))?.["outputTypes"]?.[handleId];
      const nodes = get(nodeState);
      let valid = {};
      nodes
        // filter over every node, and see if their input types contain our outputType at the handle
        .filter((node) => {
          const { inputTypes } = get(nodeDataState(node.id));
          return inputTypes ? Object.values(inputTypes).includes(type) : false;
        })
        .forEach((node) => {
          const { id } = node;
          const inputTypes = get(nodeDataState(id)).inputTypes;
          const handles = Object.keys(inputTypes).filter((key) => {
            return (inputTypes[key] === type || inputTypes[key] === "any") && !get(connectedValueSelector([id, key]));
          });
          valid[id] = handles;
        });
      return valid;
    },
});

import { selector, selectorFamily } from "recoil";
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

// @param: nodeId
// @returns: an object with data for each of the handles, a b c etc
// @dev, this algorithm runs in O(n) time for each node. Rather than O(n) for each handle on each node
export const allConnectedValueSelector = selectorFamily<any, string>({
  key: "@allConnectedValueSelector",
  dangerouslyAllowMutability: true,

  get:
    (id) =>
    ({ get }) => {
      // key: targetHandle
      // value: nodeData
      // An object used to map all the connected nodes to their connectedHandles
      const handleToNodes = {};
      // All connected nodes to this id.
      get(edgeState).forEach((edge) => {
        const {targetHandle, sourceHandle, source, target} = edge;
        if(target === id) {
          if(targetHandle && sourceHandle && source) {
            handleToNodes[targetHandle] = get(nodeDataState(source))[sourceHandle]
          }
        }
      });
      console.log(handleToNodes)
      return handleToNodes;
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
          if (node.id === id) return false;
          const { inputTypes } = get(nodeDataState(node.id));
          return inputTypes ? Object.values(inputTypes).includes(type) || Object.values(inputTypes).includes("any") || type === "any" : false;
        })
        .forEach((node) => {
          const { id } = node;
          const inputTypes = get(nodeDataState(id)).inputTypes;
          const handles = Object.keys(inputTypes).filter((key) => {
            if (type === "any") return true;
            return (inputTypes[key] === type || inputTypes[key] === "any") && !get(allConnectedValueSelector(id))[key];
          });
          valid[id] = handles;
        });
      return valid;
    },
});

export const allNodeDataSelector = selector<Object[]>({
  key: "@allNodeDataSelector",
  dangerouslyAllowMutability: true,
  get: ({ get }) => {
    const nodes = get(nodeState);
    return nodes.map((node) => get(nodeDataState(node.id)));
  },
  set: ({ set }, newNodeData: any) => {
    newNodeData.forEach((node) => {
      set(nodeDataState(node.id), node);
    });
  },
});

export const maxNodeIdSelector = selector({
  key: "@maxNodeId",
  get: ({ get }) => {
    const nodes = get(nodeState);
    return nodes.length > 0 ? String(Math.max(...nodes.map((node) => Number(node.id))) + 1) : "0";
  },
});

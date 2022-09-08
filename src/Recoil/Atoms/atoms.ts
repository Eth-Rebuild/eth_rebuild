import { atom, atomFamily, selectorFamily } from "recoil";
import * as Displays from "../../Nodes/Displays";
import * as Pipes from "../../Nodes/Pipes";
import * as Inputs from "../../Nodes/Inputs";
import { Edge, Node } from "react-flow-renderer";

export const nodeTypesState = atom({
  key: "nodeTypes",
  default: {
    // inputs
    numberInputNode: Inputs.NumberInputNode,
    stringInputNode: Inputs.StringInputNode,
    buttonInputNode: Inputs.ButtonInputNode,

    // pipes
    multiplicationNode: Pipes.MuliplicationNode,
    stringConcatNode: Pipes.StringConcatNode,
    hashNode: Pipes.HashNode,
    encryptNode: Pipes.EncryptNode,

    // displays
    numberDisplayNode: Displays.NumberDisplayNode,
    stringDisplayNode: Displays.StringDisplayNode,
    multiDisplayNode: Displays.MultiDisplayNode,
    arrayDisplayNode: Displays.ArrayDisplayNode,
    addressDisplayNode: Displays.AddressDisplayNode,
  },
});

export const nodeTypesPrettyState = atom({
  key: "nodeTypesPretty",
  default: {
    // inputs
    inputs: {
      numberInputNode: "Number Input",
      stringInputNode: "String Input",
      buttonInputNode: "Button",
    },
    pipes: {
      multiplicationNode: "Multiplication",
      stringConcatNode: "String Concat",
      hashNode: "Hash Node",
      encryptNode: "Encrypt Node",
    },
    displays: {
      numberDisplayNode: "Number Display",
      stringDisplayNode: "String Display",
      multiDisplayNode: "Multi Display",
      arrayDisplayNode: "Array Display",
      addressDisplayNode: "Address Display",
    },
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
  default: {},
});

export const cursorPositionState = atom({
  key: "cursorPosition",
  default: { x: 0, y: 0 },
});

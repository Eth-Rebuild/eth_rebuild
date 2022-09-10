import { atom, atomFamily } from "recoil";
import * as Displays from "../../Nodes/Displays";
import * as Pipes from "../../Nodes/Pipes";
import * as Inputs from "../../Nodes/Inputs";
import { Edge, Node } from "react-flow-renderer";

export const nodeTypesState = atom({
  key: "nodeTypes",
  default: {
    //  -------
    // | Inputs |
    //  -------
    numberInputNode: Inputs.NumberInputNode,
    stringInputNode: Inputs.StringInputNode,
    buttonInputNode: Inputs.ButtonInputNode,

    //  -------
    // | PIPES |
    //  -------

    // MATH
    multiplicationNode: Pipes.MuliplicationNode,
    divisionNode: Pipes.DivisionNode,
    moduloNode: Pipes.ModuloNode,
    minNode: Pipes.MinNode,
    maxNode: Pipes.MaxNode,
    additionNode: Pipes.AdditionNode,
    subtractionNode: Pipes.SubtractionNode,
    stringConcatNode: Pipes.StringConcatNode,

    // CRYPTO
    hashNode: Pipes.HashNode,
    encryptNode: Pipes.EncryptNode,
    keyPairNode: Pipes.KeyPairNode,

    // LOGIC
    andNode: Pipes.ANDNode,
    notNode: Pipes.NOTNode,
    orNode: Pipes.ORNode,
    xorNode: Pipes.XORNode,

    // ETHERS
    providerNode: Pipes.ProviderNode,
    getBalanceNode: Pipes.GetBalanceNode,

    //  ---------
    // | Displays |
    //  ---------
    numberDisplayNode: Displays.NumberDisplayNode,
    stringDisplayNode: Displays.StringDisplayNode,
    multiDisplayNode: Displays.MultiDisplayNode,
    arrayDisplayNode: Displays.ArrayDisplayNode,
    addressDisplayNode: Displays.AddressDisplayNode,
    conditionalDisplayNode: Displays.ConditionalDisplayNode,
    booleanDisplayNode: Displays.BooleanDisplayNode,
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
      // MATH
      multiplicationNode: "Multiplication",
      additionNode: "Addition",
      subtractionNode: "Subtraction",
      divisionNode: "Division",
      moduloNode: "Modulo",
      minNode: "Min",
      maxNode: "Max",
      stringConcatNode: "String Concat",

      // CRYPTO
      hashNode: "Hash Node",
      encryptNode: "Encrypt Node",
      keyPairNode: "Key Pair",

      // LOGIC
      andNode: "AND Node",
      notNode: "NOT Node",
      orNode: "OR Node",
      xorNode: "XOR Node",

      // ETHERS
      providerNode: "Provider Node",
      getBalanceNode: "Balance Node",
    },
    displays: {
      numberDisplayNode: "Number Display",
      stringDisplayNode: "String Display",
      multiDisplayNode: "Multi Display",
      arrayDisplayNode: "Array Display",
      addressDisplayNode: "Address Display",
      conditionalDisplayNode: "Conditional Display",
      booleanDisplayNode: "Boolean Display",
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
  dangerouslyAllowMutability: true,
  default: {},
});

export const cursorPositionState = atom({
  key: "cursorPosition",
  default: { x: 0, y: 0 },
});

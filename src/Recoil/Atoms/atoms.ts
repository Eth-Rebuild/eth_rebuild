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
    Input: {
      numberInputNode: "Number",
      stringInputNode: "String",
      buttonInputNode: "Button",
    },
    Display: {
      numberDisplayNode: "Number",
      stringDisplayNode: "String",
      multiDisplayNode: "Multi",
      arrayDisplayNode: "Array",
      addressDisplayNode: "Address",
      conditionalDisplayNode: "Conditional",
      booleanDisplayNode: "Boolean",
    },
    // TODO: Add storage maybe?
    // Storage: {},
    // TODO: Add axios api interfaces
    Network: {},
    Crypto: {
      hashNode: "Hash",
      encryptNode: "Encrypt",
      keyPairNode: "Key Pair",
    },
    Ethers: {
      providerNode: "Provider",
      getBalanceNode: "Balance",
    },
    Control: {
      andNode: "AND",
      notNode: "NOT",
      orNode: "OR",
      xorNode: "XOR",
    },
    Math: {
      multiplicationNode: "Multiplication",
      additionNode: "Addition",
      subtractionNode: "Subtraction",
      divisionNode: "Division",
      moduloNode: "Modulo",
      minNode: "Min",
      maxNode: "Max",
    },
    // TODO: Fill with ethers utils
    Utils: {},
    String: {
      stringConcatNode: "Concat",
    },
    // TODO ADD THIS
    Object: {},
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

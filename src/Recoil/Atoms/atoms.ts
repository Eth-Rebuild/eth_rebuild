import { atom, atomFamily, selectorFamily } from "recoil";
import * as Displays from "../../Nodes/Displays";
import * as Pipes from "../../Nodes/Pipes";
import * as Inputs from "../../Nodes/Inputs";
import { Edge, Node } from "reactflow";
import { validNodeConnectionSelector } from "../Selectors/selectors";

export const nodeTypesState = atom({
  key: "nodeTypes",
  default: {
    //  -------
    // | Inputs |
    //  -------
    numberInputNode: Inputs.NumberInputNode,
    stringInputNode: Inputs.StringInputNode,
    buttonInputNode: Inputs.ButtonInputNode,
    anyInputNode: Inputs.AnyInputNode,

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
    sharedSecretNode: Pipes.SharedSecretNode,
    keyPairNode: Pipes.KeyPairNode,
    encryptNode: Pipes.EncryptNode,

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
      anyInputNode: "Any",
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
      sharedSecretNode: "Shared Secret",
      keyPairNode: "Key Pair",
      encryptNode: "Encrypt",
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

export const maxNodeIdState = atom({
  key: "maxNodeId",
  default: 0,
});

export const edgeState = atom<Array<Edge>>({
  key: "edges",
  default: [],
});

//@params: nodeID: string
export const nodeDataState = atomFamily<any, string>({
  key: "nodeDataState",
  dangerouslyAllowMutability: true,
  default: {
    a: undefined,
    b: undefined,
    c: undefined,
    d: undefined,
    e: undefined,
    f: undefined,
    g: undefined,
    h: undefined,
    i: undefined,
    j: undefined,
    k: undefined,
    l: undefined,
    m: undefined,
    n: undefined,
    o: undefined,
    p: undefined,
    inputTypes: undefined,
    outputTypes: undefined,
  },
});

export const cursorPositionState = atom({
  key: "cursorPosition",
  default: { x: 0, y: 0 },
});

import { Layout, Menu, MenuItemProps } from "antd";
import { useRecoilValue, useRecoilState } from "recoil";
import { nodeTypesPrettyState, nodeState, maxNodeIdState } from "../Recoil/Atoms/atoms";
import { useReactFlow } from "reactflow";
const { Header } = Layout;

export function MenuHeader() {
  const nodeTypesPretty = useRecoilValue(nodeTypesPrettyState);
  const [nodes, setNodes] = useRecoilState(nodeState);
  const [maxNodeId, setMaxNodeId] = useRecoilState(maxNodeIdState);
  const { project } = useReactFlow();

  function addNode(type: string) {
    const id = String(maxNodeId);
    setMaxNodeId(maxNodeId + 1);
    setNodes((nodes) => {
      return [
        ...nodes,
        {
          id,
          type: type,
          data: {},
          position: project({
            x: window.innerWidth / 2,
            y: window.innerHeight / 2 - 300,
          }),
        },
      ];
    });
  }

  interface MenuObjectProps {
    key: string;
    label: string;
    children?: MenuObjectProps[];
    onClick?: VoidFunction;
  }

  function makeBins(root: object): Array<MenuObjectProps> {
    return Object.keys(root).map((key) => {
      if (typeof root[key] == "object") {
        return {
          key,
          label: typeof root[key] == "object" ? key : root[key],
          children: makeBins(root[key]),
        };
      } else {
        return {
          key,
          label: typeof root[key] == "object" ? key : root[key],
          onClick: () => addNode(key),
        };
      }
    });
  }

  return (
    <Header
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      <Menu
        mode="horizontal"
        items={makeBins(nodeTypesPretty)}
        style={{
          backgroundColor: "#ffffff",
          justifyContent: "center",
        }}
      />
    </Header>
  );
}

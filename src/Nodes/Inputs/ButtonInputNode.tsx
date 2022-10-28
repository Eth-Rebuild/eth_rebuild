import { useRecoilState } from "recoil";
import { nodeDataState } from "../../Recoil/Atoms/atoms";
import { Button } from "antd";
import { Handles } from "../../Helpers/helpers";

export function ButtonInputNode({ id }) {
  const [state, setState] = useRecoilState(nodeDataState(id));

  // write a function that when the button is clicked, set the value of the output to true for 1 second, then set it back to false

  function handleClick() {
    setState((oldState) => ({ ...oldState, a: true }));
    setTimeout(() => {
      setState((oldState) => ({ ...oldState, a: false }));
    }, 1000);
  }

  return (
    <div className="custom-node input">
      <h4>Button Input</h4>
      <Button className="input" type="primary" onClick={handleClick} size="large">
        {"Click"}
      </Button>
      <Handles
        id={id}
        outputTypes={{
          a: "boolean",
        }}
      />
    </div>
  );
}

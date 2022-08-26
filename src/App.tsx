import "./App.css";
import { ReactFlowProvider } from "./ReactFlowProvider";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <ReactFlowProvider />
      </div>
    </RecoilRoot>
  );
}

export default App;

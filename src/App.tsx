import "./App.css";
import { Flow } from "./Flow";
import { ReactFlowProvider } from "react-flow-renderer";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <ReactFlowProvider>
          <Flow />
        </ReactFlowProvider>
      </div>
    </RecoilRoot>
  );
}

export default App;

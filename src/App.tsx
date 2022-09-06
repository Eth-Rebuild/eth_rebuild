import "./App.css";
import { Flow } from "./Flow";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Flow />
      </div>
    </RecoilRoot>
  );
}

export default App;

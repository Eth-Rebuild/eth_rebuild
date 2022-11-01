import "./App.css";
import { Flow } from "./Flow";
import { Landing } from "./Components/Landing";
import { ReactFlowProvider } from "reactflow";
import { RecoilRoot } from "recoil";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/create/:buildId",
    element: <Flow />,
  },
]);

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <ReactFlowProvider>
          {/* <Flow /> */}
          <RouterProvider router={router} />
        </ReactFlowProvider>
      </div>
    </RecoilRoot>
  );
}

export default App;

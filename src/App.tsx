import "./App.css";
import { Flow } from "./Flow";
import { Landing } from "./Components/Landing";
import { ReactFlowProvider } from "reactflow";
import { RecoilRoot } from "recoil";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/create",
    element: <Flow />,
  },
  {
    path: "/create/:buildId",
    element: <Flow />,
  },
]);

function App() {
  return (
    <RecoilRoot>
      <WagmiConfig client={client}>
        <div className="App">
          <ReactFlowProvider>
            {/* <Flow /> */}
            <RouterProvider router={router} />
          </ReactFlowProvider>
        </div>
      </WagmiConfig>
    </RecoilRoot>
  );
}

export default App;

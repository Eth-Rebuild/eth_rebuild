import "./App.css";
import { Flow } from "./Flow";
import { Landing } from "./Components/Landing";
import { ReactFlowProvider } from "reactflow";
import { RecoilRoot } from "recoil";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { WagmiConfig, createClient } from "wagmi";
import { AlchemyProvider } from "@ethersproject/providers";

const client = createClient({
  autoConnect: true,
  provider: new AlchemyProvider(1, process.env.REACT_APP_ALCHEMY_API_KEY),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/build",
    element: <Flow />,
  },
  {
    path: "/build/:buildId",
    element: <Flow />,
  },
]);

function App() {
  return (
    <RecoilRoot>
      <WagmiConfig client={client}>
        <div className="App">
          <ReactFlowProvider>
            <RouterProvider router={router} />
          </ReactFlowProvider>
        </div>
      </WagmiConfig>
    </RecoilRoot>
  );
}

export default App;

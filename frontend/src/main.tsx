import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import {
  ConnectKitProvider,
  getDefaultConfig,
} from "connectkit"
import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import {
  createConfig,
  http,
  WagmiProvider,
} from "wagmi"
import { mantaSepoliaTestnet } from "wagmi/chains"
import "./index.css"
import RootPage from "./routes/RootPage"
import TrafficDataPage from "./routes/TrafficData"
import ValidatorPage from "./routes/ValidatorPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <TrafficDataPage />,
      },
      {
        path: "/validator",
        element: <ValidatorPage />,
      },
    ],
  },
])

const config = createConfig(
  getDefaultConfig({
    chains: [ mantaSepoliaTestnet ],
    transports: {
      [mantaSepoliaTestnet.id]: http(),
    },
    walletConnectProjectId: "3744d5a2fe976f821f378bdd74fcab66",
    appName: "de-traffic",
    appDescription: "decentralized traffic light data validator",
    appUrl: "https://github.com/sweetim/de-traffic", // your app's url
    appIcon: "https://t4.ftcdn.net/jpg/06/07/12/87/360_F_607128748_ItZdMajWgPrq2dVR25tTvxprPmq4kWx0.jpg", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
)
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <RouterProvider router={router} />
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)

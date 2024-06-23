import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import {
  CHAIN_NAMESPACES,
  CustomChainConfig,
  WEB3AUTH_NETWORK,
} from "@web3auth/base"
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider"
import { MetamaskAdapter } from "@web3auth/metamask-adapter"
import { Web3AuthOptions } from "@web3auth/modal"
import {
  Web3AuthContextConfig,
  Web3AuthInnerContext,
  Web3AuthProvider,
} from "@web3auth/modal-react-hooks"
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin"
import { WalletServicesProvider } from "@web3auth/wallet-services-plugin-react-hooks"
import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { toHex } from "viem"
import { mantaSepoliaTestnet } from "viem/chains"
import {
  createConfig,
  http,
  WagmiProvider,
} from "wagmi"
import "./index.css"
import ProtectedRoute from "./modules/common/ProtectedRoute.tsx"
import Landing from "./routes/Landing.tsx"
import ParentRoot from "./routes/ParentRoot.tsx"
import Account from "./routes/app/Account.tsx"
import Capture from "./routes/app/Capture.tsx"
import Home from "./routes/app/Home.tsx"
import Root from "./routes/app/Root.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <ParentRoot />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "app",
        element: (
          <ProtectedRoute>
            <Root />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "capture",
            element: <Capture />,
          },
          {
            path: "account",
            element: <Account />,
          },
        ],
      },
    ],
  },
])

const chainConfig: CustomChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: toHex(mantaSepoliaTestnet.id),
  rpcTarget: mantaSepoliaTestnet.rpcUrls.default.http[0],
  displayName: mantaSepoliaTestnet.name,
  blockExplorerUrl: mantaSepoliaTestnet.blockExplorers?.default.url || "https://sepolia.explorer.zksync.io/",
  ticker: mantaSepoliaTestnet.nativeCurrency.symbol,
  tickerName: mantaSepoliaTestnet.nativeCurrency.name,
  isTestnet: true,
}

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig,
  },
})

const metamaskAdapter = new MetamaskAdapter({
  clientId: import.meta.env.VITE_WEB3_AUTH_CLIENT_ID,
  sessionTime: 3600, // 1 hour in seconds
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  chainConfig,
})

export const web3AuthOptions: Web3AuthOptions = {
  clientId: import.meta.env.VITE_WEB3_AUTH_CLIENT_ID,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: privateKeyProvider,
  uiConfig: {
    appName: "de-traffic",
    mode: "dark",
  },
}

const walletServicesPlugin = new WalletServicesPlugin({
  wsEmbedOpts: {},
  walletInitOptions: { whiteLabel: { showWidgetButton: true } },
})

const web3AuthContextConfig: Web3AuthContextConfig = {
  web3AuthOptions,
  adapters: [ metamaskAdapter ],
  plugins: [ walletServicesPlugin ],
  // plugins: [],
}

const queryClient = new QueryClient()

const config = createConfig({
  chains: [ mantaSepoliaTestnet ],
  transports: {
    [mantaSepoliaTestnet.id]: http(),
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3AuthProvider config={web3AuthContextConfig}>
      <WalletServicesProvider context={Web3AuthInnerContext}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </WagmiProvider>
      </WalletServicesProvider>
    </Web3AuthProvider>
  </React.StrictMode>,
)

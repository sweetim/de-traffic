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
import {
  ConfigProvider,
  theme,
} from "antd"
import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { toHex } from "viem"
import {
  createConfig,
  http,
  WagmiProvider,
} from "wagmi"
import { chainToUse } from "./contract/index.ts"
import "./index.css"
import ProtectedRoute from "./modules/common/ProtectedRoute.tsx"
import LandingPage from "./routes/LandingPage.tsx"
import RootPage from "./routes/RootPage.tsx"
import AccountPage from "./routes/app/AccountPage.tsx"
import AppRootPage from "./routes/app/AppRootPage.tsx"
import CapturePage from "./routes/app/CapturePage.tsx"
import CollectionIdPage from "./routes/app/CollectionIdPage.tsx"
import CollectionPage from "./routes/app/CollectionPage.tsx"
import ImageDetectionPage from "./routes/app/ImageDetectionPage.tsx"
import MapsPage from "./routes/app/MapsPage.tsx"
import WalletPage from "./routes/app/WalletPage.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "app",
        element: (
          <ProtectedRoute>
            <AppRootPage />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <MapsPage />,
          },
          {
            path: "collection",
            element: <CollectionPage />,
            children: [],
          },
          {
            path: "collection/:id",
            element: <CollectionIdPage />,
          },
          {
            path: "capture",
            element: <CapturePage />,
          },
          {
            path: "image-detection",
            element: <ImageDetectionPage />,
          },
          {
            path: "wallet",
            element: <WalletPage />,
          },
          {
            path: "account",
            element: <AccountPage />,
          },
        ],
      },
    ],
  },
])

const chainConfig: CustomChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: toHex(chainToUse.id),
  rpcTarget: chainToUse.rpcUrls.default.http[0],
  displayName: chainToUse.name,
  blockExplorerUrl: chainToUse.blockExplorers?.default.url || "https://sepolia.explorer.zksync.io/",
  ticker: chainToUse.nativeCurrency.symbol,
  tickerName: chainToUse.nativeCurrency.name,
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
  chains: [ chainToUse ],
  transports: {
    [chainToUse.id]: http(),
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3AuthProvider config={web3AuthContextConfig}>
      <WalletServicesProvider context={Web3AuthInnerContext}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ConfigProvider
              theme={{
                algorithm: theme.darkAlgorithm,
              }}
            >
              <RouterProvider router={router} />
            </ConfigProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </WalletServicesProvider>
    </Web3AuthProvider>
  </React.StrictMode>,
)

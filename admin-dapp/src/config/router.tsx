import {
  AppTrafficDataByIdPage,
  AppValidatorPage,
  AppWalletPage,
  LandingPage,
  RootPage,
} from "@/routes"
import AppRootPage from "@/routes/app/AppRootPage"
import AppTrafficDataPage from "@/routes/app/AppTrafficData"
import { createBrowserRouter } from "react-router-dom"

export type TrafficByIdPageParams = {
  trafficId: `0x${string}`
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/app",
        element: <AppRootPage />,
        children: [
          {
            path: "traffic",
            element: <AppTrafficDataPage />,
            children: [
              {
                path: "id/:trafficId",
                element: <AppTrafficDataByIdPage />,
                loader: async ({ params }) => {
                  const { trafficId } = params
                  return {
                    trafficId,
                  } as TrafficByIdPageParams
                },
              },
            ],
          },
          {
            path: "validator",
            element: <AppValidatorPage />,
          },
          {
            path: "wallet",
            element: <AppWalletPage />,
          },
        ],
      },
    ],
  },
])

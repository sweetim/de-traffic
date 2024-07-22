import { defineConfig } from "@wagmi/cli"
import { react } from "@wagmi/cli/plugins"
import { Abi } from "viem"
import { abi as trafficDataAbi } from "./abis/TrafficData.json"
import { abi as trafficErc20Abi } from "./abis/TrafficERC20.json"

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "TrafficData",
      abi: trafficDataAbi as Abi,
    },
    {
      name: "TrafficERC20",
      abi: trafficErc20Abi as Abi,
    },
  ],
  plugins: [
    react(),
  ],
})

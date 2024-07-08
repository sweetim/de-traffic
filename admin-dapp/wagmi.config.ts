import { defineConfig } from "@wagmi/cli"
import { react } from "@wagmi/cli/plugins"
import { Abi } from "viem"
import { abi } from "./TrafficData.json"

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "TrafficData",
      abi: abi as Abi,
    },
  ],
  plugins: [
    react(),
  ],
})

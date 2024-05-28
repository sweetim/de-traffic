import "dotenv/config"

import "@nomicfoundation/hardhat-toolbox-viem"
import type { HardhatUserConfig } from "hardhat/config"

const PRIVATE_KEY = process.env.PRIVATE_KEY || ""

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    mantaTestnet: {
      url: "https://pacific-rpc.sepolia-testnet.manta.network/http",
      chainId: 3441006,
      accounts: [ PRIVATE_KEY ],
    },
  },
}

export default config

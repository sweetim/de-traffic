import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const { API_URL, PRIVATE_KEY } = process.env

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [ PRIVATE_KEY! ]
    },
    manta: {
      url: "https://pacific-rpc.sepolia-testnet.manta.network/http",
      chainId: 3441006
    }
  }
};

export default config;

import "dotenv/config"

import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
} from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { mantaSepoliaTestnet } from "viem/chains"

import hre from "hardhat"

const TRAFFIC_DATA_CONTRACT_ADDRESS = process.env.TRAFFIC_DATA_CONTRACT_ADDRESS || ""
const TICKET_ERC20_CONTRACT_ADDRESS = process.env.TICKET_ERC20_CONTRACT_ADDRESS || ""

const PRIVATE_KEY = process.env.PRIVATE_KEY || ""

const account = privateKeyToAccount(PRIVATE_KEY as `0x${string}`)

const chainToUse = mantaSepoliaTestnet

const walletClient = createWalletClient({
  account,
  chain: chainToUse,
  transport: http(),
})

const publicClient = createPublicClient({
  chain: chainToUse,
  transport: http(),
})

async function main() {
  const { abi } = hre.artifacts.readArtifactSync("TrafficData")

  const trafficData = getContract({
    address: TRAFFIC_DATA_CONTRACT_ADDRESS as `0x${string}`,
    abi,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  })

  console.log(await trafficData.read.getIndex())

  const tx = await trafficData.write.registerToken(
    [
      TICKET_ERC20_CONTRACT_ADDRESS as `0x{string}`,
    ],
    {
      account,
    },
  )
  console.log(tx)
}

main().then(console.log)

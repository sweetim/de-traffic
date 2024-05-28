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

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""

const account = privateKeyToAccount(PRIVATE_KEY as `0x${string}`)

const walletClient = createWalletClient({
  account,
  chain: mantaSepoliaTestnet,
  transport: http(),
})

const publicClient = createPublicClient({
  chain: mantaSepoliaTestnet,
  transport: http(),
})

async function main() {
  const { abi } = hre.artifacts.readArtifactSync("TrafficData")

  const trafficData = getContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  })

  console.log(await trafficData.read.getIndex())

  const tx = await trafficData.write.registerValidator(
    [
      "validator-2",
      [
        "yolov6",
      ],
    ],
    {
      account,
    },
  )
  console.log(tx)
  console.log(await trafficData.read.getIndex())
}

main().then(console.log)

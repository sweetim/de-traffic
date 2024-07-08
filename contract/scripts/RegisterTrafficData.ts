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
    address: TRAFFIC_DATA_CONTRACT_ADDRESS as `0x${string}`,
    abi,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  })

  console.log(await trafficData.read.getIndex())

  const tx = await trafficData.write.registerTrafficLight(
    [
      {
        owner: account.address,
        lat: BigInt(35627992),
        lng: BigInt(139775369),
        orientation: BigInt(2321213),
        uri: [ "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktRQeMv6mvYzVr3gT0qLUYjbtBjpcNNGvPxpHENpTGg&s" ],
        validationStatus: 0,
      },
    ],
    {
      account,
    },
  )
  console.log(tx)
  console.log(await trafficData.read.getIndex())
}

main().then(console.log)

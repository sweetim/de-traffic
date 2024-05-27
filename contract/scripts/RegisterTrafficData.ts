import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
} from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { hardhat } from "viem/chains"

import hre from "hardhat"

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const USER_PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

const account = privateKeyToAccount(USER_PRIVATE_KEY)

const walletClient = createWalletClient({
  account,
  chain: hardhat,
  transport: http(),
})

const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
})

async function main() {
  const { abi } = hre.artifacts.readArtifactSync("TrafficData")

  const trafficData = getContract({
    address: CONTRACT_ADDRESS,
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
        lat: BigInt(0),
        lng: BigInt(1),
        orientation: BigInt(2),
        uri: [ "abc" ],
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

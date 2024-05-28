import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
} from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { mantaSepoliaTestnet } from "viem/chains"

import hre from "hardhat"
import { EventEmitter } from "node:events"

const CONTRACT_ADDRESS = "0xe441CF0795aF14DdB9f7984Da85CD36DB1B8790d" // "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const USER_PRIVATE_KEY = process.env.PRIVATE_KEY || ""

const account = privateKeyToAccount(USER_PRIVATE_KEY as `0x${string}`)

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
    address: CONTRACT_ADDRESS,
    abi,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  })

  const trafficIndexesEmitter = new EventEmitter()
  trafficIndexesEmitter.on("msg", async (ids: bigint[]) => {
    const trafficLightData = await Promise.all(
      ids.map(id => trafficData.read.getTrafficLightByIndex([ id ])),
    )
    console.log("list of ids waiting to be validated ", ids)
    const status = await processTrafficLightData(trafficLightData)

    if (status) {
      Promise.all(ids.map(id => trafficData.write.updateValidationStatus([ id, 2 ])))
      console.log(ids, "validated successful")
    }
  })

  const unwatch = trafficData.watchEvent.NewTrafficLightRegister({}, {
    onLogs: logs => {
      const trafficIndexes = logs
        .map(item => item.args.index)

      trafficIndexesEmitter.emit("msg", trafficIndexes)
    },
  })

  async function processTrafficLightData(trafficLightData: any): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return true
  }
}

main().then(console.log)

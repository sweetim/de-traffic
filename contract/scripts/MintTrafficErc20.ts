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

const TICKET_ERC20_CONTRACT_ADDRESS = process.env.TICKET_ERC20_CONTRACT_ADDRESS || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""

const TO_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

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
  const { abi } = hre.artifacts.readArtifactSync("TrafficERC20")

  const trafficErc20 = getContract({
    address: TICKET_ERC20_CONTRACT_ADDRESS as `0x${string}`,
    abi,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  })

  await publicClient.waitForTransactionReceipt({
    hash: await trafficErc20.write.mint([
      TO_ADDRESS,
      BigInt(2),
    ]),
  })

  const balance_trfc = await trafficErc20.read.balanceOf([
    TO_ADDRESS,
  ])

  console.log(`minted TRFC to ${TO_ADDRESS}`)
  console.log(`${balance_trfc} TRFC`)
}

main().then(console.log)

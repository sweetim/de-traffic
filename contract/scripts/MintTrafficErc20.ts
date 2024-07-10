import "dotenv/config"

import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
} from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { hardhat } from "viem/chains"

import hre from "hardhat"

const TICKET_ERC20_CONTRACT_ADDRESS = process.env.TICKET_ERC20_CONTRACT_ADDRESS || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""

const TO_ADDRESS = "0xeC1C571c8B817f9BC91C2cD55F4898f304EbdB5b"

const account = privateKeyToAccount(PRIVATE_KEY as `0x${string}`)

const CHAIN_TO_USE = hardhat

const walletClient = createWalletClient({
  account,
  chain: CHAIN_TO_USE,
  transport: http(),
})

const publicClient = createPublicClient({
  chain: CHAIN_TO_USE,
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

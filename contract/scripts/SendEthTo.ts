import "dotenv/config"

import {
  createPublicClient,
  createWalletClient,
  formatEther,
  http,
} from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { hardhat } from "viem/chains"

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
  const toBalance_before = await publicClient.getBalance({
    address: TO_ADDRESS,
  })

  await walletClient.sendTransaction({
    to: TO_ADDRESS,
    value: BigInt(10e18),
  })

  const toBalance_after = await publicClient.getBalance({
    address: TO_ADDRESS,
  })

  console.table({
    toBalance_before: formatEther(toBalance_before),
    toBalance_after: formatEther(toBalance_after),
  })
}

main().then(console.log)

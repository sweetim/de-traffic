import { IProvider } from "@web3auth/base"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  useEffect,
  useState,
} from "react"
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
} from "viem"
import { mantaSepoliaTestnet } from "viem/chains"

export function useWalletAddress() {
  const [ walletAddress, setWalletAddress ] = useState<`0x${string}`[]>([])
  const [ balance_eth, setBalance_eth ] = useState(0)

  const {
    provider,
  } = useWeb3Auth()

  useEffect(() => {
    ;(async () => {
      if (!provider) return

      const walletClient = createWalletClient({
        chain: mantaSepoliaTestnet,
        transport: custom<IProvider>(provider),
      })

      setWalletAddress(await walletClient.getAddresses())
    })()
  }, [ provider ])

  useEffect(() => {
    ;(async () => {
      if (!provider) return
      if (walletAddress.length === 0) return

      const publicClient = createPublicClient({
        chain: mantaSepoliaTestnet,
        transport: http(),
      })

      const [ address ] = walletAddress

      const balance = await publicClient.getBalance({
        address,
      })

      setBalance_eth(Number(balance))
    })()
  }, [ walletAddress ])

  return {
    walletAddress,
    balance_eth,
  }
}

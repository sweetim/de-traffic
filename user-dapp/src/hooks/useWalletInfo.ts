import {
  chainToUse,
  TICKET_ERC20_CONTRACT_ADDRESS,
} from "@/contract"
import { useReadTrafficErc20BalanceOf } from "@/generated"
import { IProvider } from "@web3auth/base"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  createPublicClient,
  createWalletClient,
  custom,
  formatEther,
  http,
} from "viem"

export function useWalletInfo() {
  const [ walletAddress, setWalletAddress ] = useState<`0x${string}` | null>(null)
  const [ balance_eth, setBalance_eth ] = useState(0)

  const {
    userInfo,
    provider,
  } = useWeb3Auth()

  useEffect(() => {
    ;(async () => {
      if (!provider) return

      const walletClient = createWalletClient({
        chain: chainToUse,
        transport: custom<IProvider>(provider),
      })

      const [ address ] = await walletClient.getAddresses()
      setWalletAddress(address)
    })()
  }, [ provider ])

  useEffect(() => {
    ;(async () => {
      if (!walletAddress) return

      const publicClient = createPublicClient({
        chain: chainToUse,
        transport: http(),
      })

      const balance = await publicClient.getBalance({
        address: walletAddress,
      })

      setBalance_eth(Number(balance))
    })()
  }, [ walletAddress ])

  const { data: balance_ticketErc20 } = useReadTrafficErc20BalanceOf({
    address: TICKET_ERC20_CONTRACT_ADDRESS,
    args: [
      walletAddress!,
    ],
  })

  const tokensData = useMemo(() => [
    {
      name: "ETH",
      description: "Ethereum",
      amount: formatEther(BigInt(balance_eth)),
      icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032",
    },
    {
      name: "TRFC",
      description: "Traffic",
      amount: balance_ticketErc20 || 0,
      icon: "/logo.jpg",
    },
  ], [ balance_eth, balance_ticketErc20 ])

  return {
    userInfo,
    walletAddress,
    balance_eth,
    balance_ticketErc20,
    tokensData,
  }
}

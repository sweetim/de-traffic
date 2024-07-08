import { TICKET_ERC20_CONTRACT_ADDRESS } from "@/contract"
import { useReadTrafficErc20BalanceOf } from "@/generated"
import {
  Avatar,
  List,
  Space,
} from "antd"
import { formatEther } from "viem"
import {
  useAccount,
  useBalance,
} from "wagmi"

export default function WalletPage() {
  const { address: walletAddress } = useAccount()

  const { data: balance_eth } = useBalance()

  const { data: balance_ticketErc20 } = useReadTrafficErc20BalanceOf({
    address: TICKET_ERC20_CONTRACT_ADDRESS,
    args: [
      walletAddress!,
    ],
  })
  console.log(balance_ticketErc20, walletAddress)
  const tokensData = [
    {
      name: "ETH",
      description: "Ethereum",
      amount: formatEther(balance_eth?.value || BigInt(0)),
      icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032",
    },
    {
      name: "TRFC",
      description: "Traffic",
      amount: balance_ticketErc20 || 0,
      icon: "/logo.jpg",
    },
  ]

  return (
    <Space direction="vertical" size="large" className="w-full p-2">
      <Space direction="vertical" className="w-full">
        <h1 className="text-slate-400">
          <strong>Tokens</strong>
        </h1>
        <List
          itemLayout="horizontal"
          dataSource={tokensData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.icon} />}
                title={item.name}
                description={item.description}
              />
              <h2 className="text-xl font-bold">{item.amount.toLocaleString()}</h2>
            </List.Item>
          )}
        />
      </Space>
    </Space>
  )
}

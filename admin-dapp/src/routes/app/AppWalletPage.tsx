import { useWalletInfo } from "@/hooks/useWalletInfo"
import {
  Avatar,
  List,
  Space,
} from "antd"

export default function AppWalletPage() {
  const { tokensData } = useWalletInfo()

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

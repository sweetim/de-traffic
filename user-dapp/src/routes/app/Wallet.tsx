import { Space } from "antd"

export default function Wallet() {
  return (
    <Space direction="vertical" size="large" className="w-full p-2">
      <Space direction="vertical" className="w-full">
        <h1>
          <strong>Tokens</strong>
        </h1>
        {
          /* <List
          itemLayout="horizontal"
          dataSource={tokensData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={item.title}
                description={item.description ? <Tag color="red">{item.description}</Tag> : ""}
              />
              <h2 className="text-xl font-bold">{item.amount?.toLocaleString()}</h2>
            </List.Item>
          )}
        /> */
        }
      </Space>
    </Space>
  )
}

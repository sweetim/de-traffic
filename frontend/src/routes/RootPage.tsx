import {
  Flex,
  Layout,
} from "antd"
import { ConnectKitButton } from "connectkit"
import { Outlet } from "react-router-dom"

const { Content, Header } = Layout

export default function RootPage() {
  return (
    <Layout className="h-screen w-full">
      <Header className="!p-3">
        <Flex className="h-full" justify="end" align="center">
          <ConnectKitButton />
        </Flex>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  )
}

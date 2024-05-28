import {
  Flex,
  Layout,
  Menu,
} from "antd"
import { ConnectKitButton } from "connectkit"
import {
  Link,
  Outlet,
} from "react-router-dom"

const { Content, Header } = Layout

export default function RootPage() {
  const items = [
    {
      key: 0,
      label: <Link to="/">Traffic</Link>,
    },
    {
      key: 1,
      label: <Link to="/validator">Validator</Link>,
    },
  ]

  return (
    <Layout className="h-screen w-full">
      <Header className="!p-3">
        <Flex className="h-full" justify="end" align="center">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[ "2" ]}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
          <ConnectKitButton />
        </Flex>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  )
}

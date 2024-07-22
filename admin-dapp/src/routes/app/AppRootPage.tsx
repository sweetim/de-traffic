import { useWalletInfo } from "@/hooks/useWalletInfo"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  Avatar,
  Button,
  Flex,
  Layout,
} from "antd"

import { User } from "@phosphor-icons/react"

import clsx from "clsx"
import {
  Link,
  Outlet,
  useLocation,
} from "react-router-dom"
import { match } from "ts-pattern"

const { Content, Header } = Layout

const navItems = [
  {
    name: "traffic",
  },
  {
    name: "validator",
  },
  {
    name: "wallet",
  },
]
export default function RootPage() {
  const location = useLocation()
  const currentToRoute = location.pathname.split("/")[2]

  const {
    connect,
    isConnected,
    logout,
  } = useWeb3Auth()

  const navMenuItems = navItems.map(item => {
    const isPathMatching = currentToRoute === item.name

    const navButtonClassName = clsx(
      "min-w-24 capitalize h-full hover:bg-zinc-700 text-white px-5 hover:text-white",
      {
        "bg-zinc-700": isPathMatching,
      },
    )

    return (
      <Link key={item.name.toString()} to={`${item.name}`}>
        <button className={navButtonClassName}>
          {item.name}
        </button>
      </Link>
    )
  })

  const { walletAddress } = useWalletInfo()

  async function loginClickHandler() {
    await connect()
  }

  async function logoutClickHandler() {
    await logout()
  }

  const renderLoginButton = match(isConnected)
    .with(false, () => (
      <Button
        onClick={loginClickHandler}
        size="large"
        shape="round"
      >
        Login
      </Button>
    ))
    .with(true, () => (
      <Button
        onClick={logoutClickHandler}
        size="large"
        shape="round"
        icon={<User size={20} color="#ffebeb" weight="fill" />}
        iconPosition="end"
      >
        {`${(walletAddress || "").slice(0, 8)}...`}
      </Button>
    ))
    .exhaustive()

  return (
    <Layout className="h-screen w-full">
      <Header className="!p-0 bg-[#141414]">
        <Flex
          className="h-full px-5"
          justify="space-between"
          align="center"
        >
          <div className="flex flex-row">
            <div className="pr-5">
              <Link to="/">
                <Avatar src="/logo.jpg" size={32} />
              </Link>
            </div>
            {navMenuItems}
          </div>
          {renderLoginButton}
        </Flex>
      </Header>
      <Content className="bg-zinc-900">
        <Outlet />
      </Content>
    </Layout>
  )
}

import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import { Layout } from "antd"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

const { Content } = Layout

export default function RootPage() {
  const {
    initModal,
    web3Auth,
  } = useWeb3Auth()

  useEffect(() => {
    ;(async () => {
      try {
        if (web3Auth) {
          await initModal()
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [ web3Auth ])

  return (
    <Layout className="h-screen w-full">
      <Content>
        <Outlet />
      </Content>
    </Layout>
  )
}

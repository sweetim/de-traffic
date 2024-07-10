import BottomNavBar from "@/modules/BottomNavBar"
import { APIProvider } from "@vis.gl/react-google-maps"
import { Layout } from "antd"
import {
  Content,
  Footer,
} from "antd/lib/layout/layout"
import { Outlet } from "react-router-dom"

export default function AppRootPage() {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API}>
      <Layout className="h-full bg-zinc-900">
        <Content className="h-full">
          <Outlet />
        </Content>
        <Footer className="!p-0">
          <BottomNavBar />
        </Footer>
      </Layout>
    </APIProvider>
  )
}

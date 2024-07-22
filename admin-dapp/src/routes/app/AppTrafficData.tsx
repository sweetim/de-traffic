import { TRAFFIC_DATA_CONTRACT_ADDRESS } from "@/contract"
import { useReadTrafficDataGetAllTrafficLightDetection } from "@/generated"
import { useWalletInfo } from "@/hooks/useWalletInfo"
import { SpinnerGap } from "@phosphor-icons/react"
import {
  Avatar,
  Col,
  Row,
  Space,
} from "antd"
import clsx from "clsx"
import { FC } from "react"
import {
  Link,
  Outlet,
  useLocation,
} from "react-router-dom"

const AppTrafficDataPage: FC = () => {
  const { walletAddress } = useWalletInfo()
  const { pathname } = useLocation()

  const currentSelectedId = Number(pathname.split("/").pop())

  const { data: allTrafficLightDetection } = useReadTrafficDataGetAllTrafficLightDetection({
    address: TRAFFIC_DATA_CONTRACT_ADDRESS,
    args: [
      walletAddress!,
    ],
  })

  console.log(allTrafficLightDetection)

  return (
    <Row>
      <Col span={4}>
        <ul>
          {allTrafficLightDetection?.map(item => {
            const trafficIdItemClassName = clsx(
              "w-full text-white hover:text-white py-2 hover:bg-zinc-800",
              {
                "bg-zinc-800": currentSelectedId === Number(item.id),
              },
            )

            return (
              <Link to={`id/${item.id}`} key={item.id}>
                <li className={trafficIdItemClassName}>
                  <Space>
                    <Avatar size={32} src={<SpinnerGap size={22} color="orange" weight="fill" />} />
                    {item.id.toString()}
                  </Space>
                </li>
              </Link>
            )
          })}
        </ul>
      </Col>
      <Col span={20}>
        <Outlet />
      </Col>
    </Row>
  )
}

export default AppTrafficDataPage

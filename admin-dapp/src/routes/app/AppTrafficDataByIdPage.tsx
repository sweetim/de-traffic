import { TrafficByIdPageParams } from "@/config/router"
import {
  convertTrafficLightDetectionFromChain,
  TRAFFIC_DATA_CONTRACT_ADDRESS,
} from "@/contract"
import { useReadTrafficDataGetAllTrafficLightDetection } from "@/generated"
import { useWalletInfo } from "@/hooks/useWalletInfo"
import TrafficLightDetectionImage from "@/modules/TrafficLightDetectionImage"
import {
  Map,
  Marker,
} from "@vis.gl/react-google-maps"
import {
  Col,
  Row,
} from "antd"
import { FC } from "react"
import { useLoaderData } from "react-router-dom"

const AppTrafficDataByIdPage: FC = () => {
  const { trafficId } = useLoaderData() as TrafficByIdPageParams
  const { walletAddress } = useWalletInfo()

  const { data: allTrafficLightDetection } = useReadTrafficDataGetAllTrafficLightDetection({
    address: TRAFFIC_DATA_CONTRACT_ADDRESS,
    args: [
      walletAddress!,
    ],
  })

  const item = allTrafficLightDetection && convertTrafficLightDetectionFromChain(
    allTrafficLightDetection?.find(item => Number(item.id) === Number(trafficId))!,
  )

  return (
    <div className="w-full h-full flex flex-col">
      <Row>
        <Col span={6}>
          <TrafficLightDetectionImage item={item!} />
        </Col>
        <Col span={6}>
          <Map
            className="h-full w-full"
            defaultCenter={{
              lat: item?.lat || 0,
              lng: item?.lng || 0,
            }}
            mapId={"3921004b6104a83f"}
            defaultZoom={18}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            <Marker
              position={{
                lat: item?.lat || 0,
                lng: item?.lng || 0,
              }}
            />
          </Map>
        </Col>
      </Row>
    </div>
  )
}

export default AppTrafficDataByIdPage

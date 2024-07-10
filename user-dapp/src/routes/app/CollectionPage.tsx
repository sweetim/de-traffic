import {
  convertTrafficLightDetectionFromChain,
  TRAFFIC_DATA_CONTRACT_ADDRESS,
  TrafficLightDetectionFromChain,
} from "@/contract"
import { useReadTrafficDataGetAllTrafficLightDetection } from "@/generated"
import { useWalletInfo } from "@/hooks/useWalletInfo"
import TrafficLightDetectionImage from "@/modules/collection/TrafficLightDetectionImage"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

const CollectionPage: FC = () => {
  const navigate = useNavigate()
  const { walletAddress } = useWalletInfo()

  const { data: allTrafficLightDetection } = useReadTrafficDataGetAllTrafficLightDetection({
    address: TRAFFIC_DATA_CONTRACT_ADDRESS,
    args: [
      walletAddress!,
    ],
  })

  function trafficLightImageClickHandler(item: TrafficLightDetectionFromChain) {
    navigate(`${item.id}`)
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2">
      {allTrafficLightDetection
        && allTrafficLightDetection.filter(item => Number(item.id) !== 2088386485).map(item => (
          <TrafficLightDetectionImage
            onClick={() => trafficLightImageClickHandler(item)}
            key={item.id}
            item={convertTrafficLightDetectionFromChain(item)}
          />
        ))}
    </div>
  )
}

export default CollectionPage

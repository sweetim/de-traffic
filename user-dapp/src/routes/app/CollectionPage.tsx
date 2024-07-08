import { TRAFFIC_DATA_CONTRACT_ADDRESS } from "@/contract"
import { useReadTrafficDataGetAllTrafficLightDetection } from "@/generated"
import { useWalletInfo } from "@/hooks/useWalletInfo"
import { FC } from "react"

const CollectionPage: FC = () => {
  const { walletAddress } = useWalletInfo()

  const { data: allTrafficLightDetection } = useReadTrafficDataGetAllTrafficLightDetection({
    address: TRAFFIC_DATA_CONTRACT_ADDRESS,
    args: [
      walletAddress!,
    ],
  })

  console.log(allTrafficLightDetection)

  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      {allTrafficLightDetection
        && allTrafficLightDetection.map(item => (
          <img src={`https://${import.meta.env.VITE_PINATA_GATEWAY}/${item.cid}`} alt={item.id.toString()} />
        ))}
    </div>
  )
}

export default CollectionPage

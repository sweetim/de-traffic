import { TRAFFIC_DATA_CONTRACT_ADDRESS } from "@/contract"
import { useReadTrafficDataGetAllTrafficLightDetection } from "@/generated"
import {
  TrafficLightOSMInfo,
  useOSMTrafficLightInfo,
} from "@/hooks/useOSMTrafficLightInfo"
import { useWalletInfo } from "@/hooks/useWalletInfo"
import { useGeolocation } from "@uidotdev/usehooks"
import {
  AdvancedMarker,
  Map,
} from "@vis.gl/react-google-maps"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import "./MapsPage.css"

const DEFAULT_LOCATION = {
  center: {
    lat: 35.627992493337665,
    lng: 139.77536944338857,
  },
  zoom: 20,
}

const MapsPage: FC = () => {
  const navigate = useNavigate()
  const { latitude, longitude, heading } = useGeolocation({
    enableHighAccuracy: true,
  })

  const { walletAddress } = useWalletInfo()

  const { data: allTrafficLightDetection } = useReadTrafficDataGetAllTrafficLightDetection({
    address: TRAFFIC_DATA_CONTRACT_ADDRESS,
    args: [
      walletAddress!,
    ],
  })

  const detectedTrafficLightSet = new Set(allTrafficLightDetection?.map(item => Number(item.id)))

  const { trafficLights } = useOSMTrafficLightInfo(latitude, longitude, 1_000)

  const lat = latitude || DEFAULT_LOCATION.center.lat
  const lng = longitude || DEFAULT_LOCATION.center.lng

  async function marketClickHandler(item: TrafficLightOSMInfo) {
    navigate("/app/capture", {
      state: {
        item,
      },
    })
  }

  return (
    <Map
      className="h-full w-full"
      defaultCenter={DEFAULT_LOCATION.center}
      center={{
        lat: lat,
        lng: lng,
      }}
      defaultZoom={DEFAULT_LOCATION.zoom}
      gestureHandling={"greedy"}
      mapId={"4f6dde3310be51d7"}
      disableDefaultUI={true}
      tilt={60}
      heading={heading}
    >
      {trafficLights.map((item) => (
        <AdvancedMarker
          key={item.id}
          position={{
            lat: item.lat,
            lng: item.lon,
          }}
          onClick={() => marketClickHandler(item)}
        >
          {detectedTrafficLightSet.has(item.id)
            ? <div className="pulsating-circle-traffic-capture" />
            : <div className="pulsating-circle-traffic" />}
        </AdvancedMarker>
      ))}
      <AdvancedMarker
        position={{
          lat,
          lng,
        }}
      >
        <div className="pulsating-circle" />
      </AdvancedMarker>
    </Map>
  )
}

export default MapsPage

import {
  TrafficLightOSMInfo,
  useOSMTrafficLightInfo,
} from "@/hooks/useOSMTrafficLightInfo"
import { useGeolocation } from "@uidotdev/usehooks"
import {
  AdvancedMarker,
  APIProvider,
  Map,
} from "@vis.gl/react-google-maps"
import { FC } from "react"
import "./MapsPage.css"

const DEFAULT_LOCATION = {
  center: {
    lat: 35.627992493337665,
    lng: 139.77536944338857,
  },
  zoom: 20,
}

const MapsPage: FC = () => {
  const { latitude, longitude } = useGeolocation({
    enableHighAccuracy: true,
  })

  const { trafficLights } = useOSMTrafficLightInfo(latitude, longitude, 1_000)

  const lat = latitude || DEFAULT_LOCATION.center.lat
  const lng = longitude || DEFAULT_LOCATION.center.lng

  async function marketClickHandler(item: TrafficLightOSMInfo) {
    console.log(item)
  }

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
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
      >
        {trafficLights.map((item, index) => (
          <AdvancedMarker
            key={item.id}
            position={{
              lat: item.lat,
              lng: item.lon,
            }}
            onClick={() => marketClickHandler(item)}
          >
            {index === 2 || index === 33
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
    </APIProvider>
  )
}

export default MapsPage

import { useGeolocation } from "@uidotdev/usehooks"
import {
  AdvancedMarker,
  APIProvider,
  Map,
} from "@vis.gl/react-google-maps"
import { FC } from "react"
import "./Home.css"
const DEFAULT_LOCATION = {
  center: {
    lat: 35.627992493337665,
    lng: 139.77536944338857,
  },
  zoom: 20,
}

const Home: FC = () => {
  const { latitude, longitude } = useGeolocation({
    enableHighAccuracy: true,
  })

  const lat = latitude || DEFAULT_LOCATION.center.lat
  const lng = longitude || DEFAULT_LOCATION.center.lng
  console.log(lat, lng)
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={DEFAULT_LOCATION.center}
        center={{
          lat: lat + 0.0005,
          lng: lng,
        }}
        defaultZoom={DEFAULT_LOCATION.zoom}
        gestureHandling={"greedy"}
        mapId={"4f6dde3310be51d7"}
        disableDefaultUI={true}
        tilt={60}
      >
        <AdvancedMarker
          position={{
            lat,
            lng,
          }}
        >
          <div className="pulsating-circle" />
        </AdvancedMarker>

        <AdvancedMarker
          position={{
            lat: 35.7730812,
            lng: 139.64911,
          }}
        >
          <div className="pulsating-circle-traffic" />
        </AdvancedMarker>
        <AdvancedMarker
          position={{
            lat: 35.773614877768395,
            lng: 139.649310536887,
          }}
        >
          <div className="pulsating-circle-traffic" />
        </AdvancedMarker>
        <AdvancedMarker
          position={{
            lat: 35.773458547218375,
            lng: 139.64873700277667,
          }}
        >
          <div className="pulsating-circle-traffic" />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  )
}

export default Home

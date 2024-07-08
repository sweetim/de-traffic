import {
  useEffect,
  useState,
} from "react"

export type TrafficLightOSMInfo = {
  id: number
  lat: number
  lon: number
  tags: {
    highway: string
  }
  type: string
}

export function useOSMTrafficLightInfo(latitude: number | null, longitude: number | null, radius_m: number) {
  const [ trafficLights, setTrafficLight ] = useState<TrafficLightOSMInfo[]>([])

  useEffect(() => {
    ;(async () => {
      if (!latitude || !longitude) return
      if (trafficLights.length > 0) return

      const query = `
      [out:json]
      [timeout:25];
      (
        node(around:${radius_m},${latitude},${longitude})["highway"="traffic_signals"];
        way(around:${radius_m},${latitude},${longitude})["highway"="traffic_signals"];
        relation(around:${radius_m},${latitude},${longitude})["highway"="traffic_signals"];
      );
      out body;
      `
      const res = await fetch(
        "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
        {
          method: "POST",
          body: `data=${encodeURIComponent(query)}`,
        },
      )

      const { elements } = await res.json()

      setTrafficLight(elements)
    })()
  }, [ latitude, longitude ])

  return {
    trafficLights,
  }
}

import { TrafficLightDetection } from "@/contract"
import {
  FC,
  MouseEventHandler,
  useRef,
  useState,
} from "react"

type TrafficLightDetectionImageProps = {
  onClick?: MouseEventHandler<HTMLDivElement>
  item: TrafficLightDetection
}

const TrafficLightDetectionImage: FC<TrafficLightDetectionImageProps> = ({ item, onClick }) => {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [ isLoaded, setIsLoaded ] = useState(false)

  return (
    <div className="relative z-0" onClick={onClick}>
      <img
        ref={imageRef}
        src={`https://${import.meta.env.VITE_PINATA_GATEWAY}/${item.cid}`}
        alt={item.id.toString()}
        onLoad={() => setIsLoaded(true)}
      />
      {(isLoaded && imageRef.current) && (
        <div
          style={{
            top: `${item.normalize.topLeft_y * imageRef.current.height}px`,
            left: `${item.normalize.topLeft_x * imageRef.current.width}px`,
            width: `${item.normalize.width * imageRef.current.width}px`,
            height: `${item.normalize.height * imageRef.current.height}px`,
          }}
          className="absolute border-red-500 bg-red-400/[.3] border-solid border-4"
        >
          <p className="p-1 pb-2 font-bold text-base bg-red-300/[.5]">
            {`${item.score.toFixed(3)`}
          </p>
        </div>
      )}
    </div>
  )
}

export default TrafficLightDetectionImage

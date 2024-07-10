import { TrafficLightDetection } from "@/contract"
import {
  FC,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react"

type TrafficLightDetectionImageProps = {
  onClick?: MouseEventHandler<HTMLDivElement>
  item: TrafficLightDetection
}

type ImageRefDimension = {
  width: number
  height: number
}

const TrafficLightDetectionImage: FC<TrafficLightDetectionImageProps> = ({ item, onClick }) => {
  const imageRef = useRef<HTMLImageElement | null>(null)

  const [ imageRefDimension, setImageRefDimension ] = useState<ImageRefDimension>({
    height: 0,
    width: 0,
  })

  useEffect(() => {
    if (!imageRef) return
    if (!imageRef.current) return

    setImageRefDimension({
      height: imageRef.current.height,
      width: imageRef.current.width,
    })
  }, [ imageRef.current?.width, imageRef.current?.height ])

  return (
    <div className="relative z-0" onClick={onClick}>
      <img
        ref={imageRef}
        src={`https://${import.meta.env.VITE_PINATA_GATEWAY}/${item.cid}`}
        alt={item.id.toString()}
      />
      {imageRef.current && (
        <div
          style={{
            top: `${item.normalize.topLeft_y * imageRefDimension.height}px`,
            left: `${item.normalize.topLeft_x * imageRefDimension.width}px`,
            width: `${item.normalize.width * imageRefDimension.width}px`,
            height: `${item.normalize.height * imageRefDimension.height}px`,
          }}
          className="absolute border-red-500 bg-red-400/[.3] border-solid border-4"
        >
          <p className="p-1 pb-2 font-bold text-base bg-red-300/[.5]">
            {`${(Number(item.score) / 1e7).toFixed(3)}`}
          </p>
        </div>
      )}
    </div>
  )
}

export default TrafficLightDetectionImage

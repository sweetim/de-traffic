import {
  AutoModel,
  AutoProcessor,
  env,
  RawImage,
} from "@xenova/transformers"
import {
  FC,
  useEffect,
  useRef,
  useState,
} from "react"

env.allowLocalModels = false
env.useBrowserCache = false

import { useLocation } from "react-router-dom"

type ModelOutput = [
  xmin: number,
  ymin: number,
  xmax: number,
  ymax: number,
  score: number,
  id: number,
]

type InputSize = [
  width: number,
  height: number,
]

type DetectedObjects = {
  topLeft_x: number
  topLeft_y: number
  width: number
  height: number
  label: string
  score: number
}

const ImageDetection: FC = () => {
  const imageContainerRef = useRef<HTMLImageElement>(null)
  const { state } = useLocation()
  const [ detectedObjects, setDetectedObjects ] = useState<DetectedObjects[]>([])

  useEffect(() => {
    ;(async () => {
      if (!state) return

      console.log("processing")
      const model = await AutoModel.from_pretrained("Xenova/yolov9-c_all")
      const processor = await AutoProcessor.from_pretrained("Xenova/yolov9-c_all")
      ;(processor.feature_extractor as any).size = { shortest_edge: 256 }

      const image = await RawImage.read(state.image)
      const inputs = await processor(image)
      const { outputs } = await model(inputs)

      const sizes = inputs.reshaped_input_sizes[0].reverse() as InputSize
      const [ w, h ] = sizes

      setDetectedObjects(
        (outputs.tolist() as ModelOutput[])
          .map(([ xmin, ymin, xmax, ymax, score, id ]) => ({
            xmin,
            ymin,
            xmax,
            ymax,
            score,
            id,
            label: model.config.id2label[id] as string,
          }))
          .filter(({ score, id }) => score > 0.3 && id !== 9)
          .map(item => ({
            topLeft_x: Math.floor((item.xmin / w) * image.width),
            topLeft_y: Math.floor((item.ymin / h) * image.height),
            width: Math.floor(item.xmax - item.xmin),
            height: Math.floor(item.ymax - item.ymin),
            label: item.label,
            score: item.score,
          })),
      )
      console.log("done")
    })()
  }, [])
  console.log(detectedObjects)
  return (
    <div className="h-full w-full z-0 relative">
      <div className="absolute inset-0">
        {detectedObjects.map(item => {
          return (
            <div
              style={{
                top: `${Math.floor(item.topLeft_y)}px`,
                left: `${Math.floor(item.topLeft_x)}px`,
                width: `${Math.floor(item.width)}px`,
                height: `${Math.floor(item.height)}px`,
              }}
              className="absolute border-red-500 bg-red-400/[.3] border-solid border-4"
            >
            </div>
          )
        })}
      </div>

      <img ref={imageContainerRef} src={state.image} className="" />
    </div>
  )
}

export default ImageDetection

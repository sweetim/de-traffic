import { SVG } from "@svgdotjs/svg.js"
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

const ImageDetection: FC = () => {
  const imageContainerRef = useRef<HTMLImageElement>(null)
  const { state } = useLocation()
  const [ detectedObjects, setDetectedObjects ] = useState([])

  useEffect(() => {
    ;(async () => {
      if (!state) return

      const image = await RawImage.read(state.image)
      // console.log(state.image)
      // console.log("image dimension", image.width, image.height, state.width, state.height)
      // const ar = image.width / image.height
      // console.log(image.width, image.height)
      // const [ cw, ch ] = (ar > 1) ? [ 640, 640 / ar ] : [ 640 * ar, 640 ]
      // console.log(cw, ch, image.width, image.height)
      // imageContainer.current!.style.width = `100%`
      // imageContainer.current!.style.height = `100%`
      // imageContainer.current!.style.backgroundImage = `url(${state.image})`

      console.log("start")
      const processor = await AutoProcessor.from_pretrained("Xenova/yolov9-c_all")
      ;(processor.feature_extractor as any).size = { shortest_edge: 256 }

      const model = await AutoModel.from_pretrained("Xenova/yolov9-c_all")
      const inputs = await processor(image)

      console.log("load finis")
      // Predict bounding boxes
      const { outputs } = await model(inputs)

      // const sizes = inputs.reshaped_input_sizes[0].reverse()

      console.log(outputs.tolist())
      setDetectedObjects(
        outputs.tolist()
          .map(([ xmin, ymin, xmax, ymax, score, id ]: any) => ({
            xmin,
            ymin,
            xmax,
            ymax,
            score,
            id,
          })).filter((item: any) => item.score < 0.25),
      )
    })()
  }, [])

  console.log(detectedObjects)
  useEffect(() => {
    if (detectedObjects.length === 0) return

    const draw = SVG().addTo(imageContainerRef.current!)
      .size(430, 241)

    const [ w, h ] = [ 256, 256 ]
    detectedObjects.forEach(([ xmin, ymin, xmax, ymax, score, _id ]: number[]) => {
      if (score > 0.25) {
        const left = 430 * (xmin / w)
        const top = 241 * (ymin / h)
        // model.config.id2label
        draw.rect(
          430 - 430 * ((xmax - xmin) / w),
          241 * ((ymax - ymin) / h),
        ).move(left, top)
          .stroke("#F00")
          .opacity(0.3)
          .fill("#F00")
      }
    })
  }, [ detectedObjects ])

  // useEffect(() => {
  //   if (imageContainer && imageContainer.current) {
  //     const draw = SVGContainer.addTo(imageContainer.current).size(640, 640)
  //     const [ w, h ] = [ 256, 256 ]
  //     const [ xmin, ymin, xmax, ymax, score, id ] = [
  //       0.16216659545898438,
  //       180.84060668945312,
  //       38.13658142089844,
  //       204.08096313476562,
  //       0.8171814680099487,
  //       1,
  //     ]

  //     const left = 640 * (xmin / w)
  //     const top = 640 * (ymin / h)
  //     console.log(left, top)
  //     draw.rect(640 * ((xmax - xmin) / w), 640 * ((ymax - ymin) / h)).move(left, top).fill("#F00")
  //   }
  // }, [ imageContainer ])
  return (
    <>
      <img ref={imageContainerRef} src={state.image} alt="" />
      <h1 className="text-white">haah</h1>
      {
        /* <div
        style={{ width: "100%", height: "100%", backgroundSize: "100% 100%", backgroundPosition: "center" }}
        ref={imageContainer}
      /> */
      }
    </>
  )
}

export default ImageDetection

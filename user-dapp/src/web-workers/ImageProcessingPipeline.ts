import {
  AutoModel,
  AutoProcessor,
  env,
  PreTrainedModel,
  RawImage,
} from "@xenova/transformers"

env.allowLocalModels = false
env.useBrowserCache = false

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

export type ImageProcessResult = {
  xmin: number
  ymin: number
  xmax: number
  ymax: number
  score: number
  id: number
  label: string
}

export type ImageProcessingPipelineMsg = {
  action: "load" | "process" | "result"
  rawImage?: any
  results?: ImageProcessResult[]
  sizes?: InputSize
}

const MIN_DETECTION_THRESHOLD = 0.3
const TRAFFIC_LIGHT_DETECTION_ID = 9

class ImageProcessingPipeline {
  static model: PreTrainedModel | null = null
  static processor: any | null = null

  static async getInstance() {
    if (this.model === null && this.processor === null) {
      this.model = await AutoModel.from_pretrained("Xenova/yolov9-c_all")
      this.processor = await AutoProcessor.from_pretrained("Xenova/yolov9-c_all")
    }

    return {
      model: this.model,
      processor: this.processor,
    }
  }
}

self.addEventListener("message", async (ev) => {
  const { action, rawImage } = ev.data as ImageProcessingPipelineMsg

  if (action === "load") {
    console.log("loading model")
    await ImageProcessingPipeline.getInstance()
    console.log("done loading model")
    return
  }

  const { model, processor } = await ImageProcessingPipeline.getInstance()

  if (!model) return
  if (!processor) return
  if (!rawImage) return

  const image = await RawImage.read(rawImage)
  const inputs = await processor(image)
  const { outputs } = await model(inputs)

  const sizes = inputs.reshaped_input_sizes[0].reverse() as InputSize

  self.postMessage({
    action: "result",
    sizes,
    results: (outputs.tolist() as ModelOutput[])
      .map(([ xmin, ymin, xmax, ymax, score, id ]) => ({
        xmin,
        ymin,
        xmax,
        ymax,
        score,
        id,
        label: model.config.id2label[id] as string,
      }))
      .filter(({ score, id }) => score > MIN_DETECTION_THRESHOLD && id === TRAFFIC_LIGHT_DETECTION_ID),
  } as ImageProcessingPipelineMsg)
})

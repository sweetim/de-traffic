import {
  createRef,
  MutableRefObject,
} from "react"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

const webWorkerRef = createRef<Worker | null>() as MutableRefObject<Worker | null>
webWorkerRef.current = null

type WebWorkerState = {
  webWorkerRef: MutableRefObject<Worker | null>
}

export const useWebWorkerStore = create<WebWorkerState>()(
  immer((_set) => ({
    webWorkerRef: webWorkerRef,
  })),
)

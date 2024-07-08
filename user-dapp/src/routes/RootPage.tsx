import { useWebWorkerStore } from "@/store/useWebWorkerStore"
import { ImageProcessingPipelineMsg } from "@/web-workers/ImageProcessingPipeline"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  FC,
  useEffect,
} from "react"
import { Outlet } from "react-router-dom"

const RootPage: FC = () => {
  const webWorkerRef = useWebWorkerStore(state => state.webWorkerRef)

  const {
    initModal,
    web3Auth,
  } = useWeb3Auth()

  useEffect(() => {
    if (!webWorkerRef.current) {
      webWorkerRef.current = new Worker(
        new URL(
          "../web-workers/ImageProcessingPipeline",
          import.meta.url,
        ),
        {
          type: "module",
        },
      )

      webWorkerRef.current.postMessage({
        action: "load",
      } as ImageProcessingPipelineMsg)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        if (web3Auth) {
          await initModal()
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [ web3Auth ])

  return (
    <div className="w-full h-[100dvh] bg-zinc-900">
      <Outlet />
    </div>
  )
}

export default RootPage

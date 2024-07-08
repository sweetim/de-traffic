import {
  chainToUse,
  TRAFFIC_DATA_CONTRACT_ADDRESS,
  TrafficLightDetection,
} from "@/contract"
import { trafficDataAbi } from "@/generated"
import { TrafficLightOSMInfo } from "@/hooks/useOSMTrafficLightInfo"
import { FillButton } from "@/modules/common"
import { useWebWorkerStore } from "@/store/useWebWorkerStore"
import { ImageProcessingPipelineMsg } from "@/web-workers/ImageProcessingPipeline"
import {
  CheckCircle,
  Hourglass,
} from "@phosphor-icons/react"
import { IProvider } from "@web3auth/base"
import { useWeb3Auth } from "@web3auth/modal-react-hooks"
import {
  Divider,
  Space,
} from "antd"
import {
  FC,
  useEffect,
  useRef,
  useState,
} from "react"

import { useLocation } from "react-router-dom"
import { match } from "ts-pattern"
import {
  createWalletClient,
  custom,
} from "viem"

type DetectedObjects = {
  topLeft_x: number
  topLeft_y: number
  width: number
  height: number
  label: string
  score: number
}

type ImageDetectionLocationState = {
  image: string | null
  item?: TrafficLightOSMInfo
}

type PinataRes = {
  IpfsHash: string
  Timestamp: string
  PinSize: number
}

const ImageDetection: FC = () => {
  const imageContainerRef = useRef<HTMLImageElement>(null)
  const webWorkerRef = useWebWorkerStore(state => state.webWorkerRef)

  const [ isUploading, setIsUploading ] = useState<boolean | null>(null)
  const [ isMinting, setIsMinting ] = useState<boolean | null>(null)

  const location = useLocation()
  const state = location.state as ImageDetectionLocationState
  const { provider } = useWeb3Auth()
  const [ detectedObjects, setDetectedObjects ] = useState<DetectedObjects[]>([])

  useEffect(() => {
    if (!webWorkerRef) return
    if (!webWorkerRef.current) return
    if (!imageContainerRef) return
    if (!imageContainerRef.current) return

    const onMessageReceivedHandler = (ev: MessageEvent<any>) => {
      const { action, results, sizes } = ev.data as ImageProcessingPipelineMsg

      if (action === "result") {
        if (!imageContainerRef) return
        if (!imageContainerRef.current) return
        if (!results) return
        if (!sizes) return

        const [ w, h ] = sizes
        const imageWidth = imageContainerRef.current.width
        const imageHeight = imageContainerRef.current.height

        setDetectedObjects(
          results.map(item => ({
            topLeft_x: Math.floor((item.xmin / w) * imageWidth),
            topLeft_y: Math.floor((item.ymin / h) * imageHeight),
            width: Math.floor((item.xmax - item.xmin) / w * imageWidth),
            height: Math.floor((item.ymax - item.ymin) / h * imageHeight),
            label: item.label,
            score: item.score,
            item,
          })),
        )
      }
    }

    webWorkerRef.current.addEventListener("message", onMessageReceivedHandler)

    return () => webWorkerRef.current?.removeEventListener("message", onMessageReceivedHandler)
  }, [ webWorkerRef, imageContainerRef ])

  useEffect(() => {
    ;(async () => {
      if (!state) return

      webWorkerRef.current?.postMessage({
        action: "process",
        rawImage: state.image,
      } as ImageProcessingPipelineMsg)
    })()
  }, [])

  async function mintClickHandler() {
    function DataURIToBlob(dataURI: string) {
      const splitDataURI = dataURI.split(",")
      const byteString = splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1])
      const mimeString = splitDataURI[0].split(":")[1].split(";")[0]

      const ia = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }

      return new Blob([ ia ], { type: mimeString })
    }

    async function uploadToPinata(): Promise<PinataRes> {
      const formData = new FormData()
      formData.append("file", DataURIToBlob(state.image as string))
      const metadata = JSON.stringify({
        name: `${state.item?.id}-${Date.now()}`,
      })
      formData.append("pinataMetadata", metadata)

      const options = JSON.stringify({
        cidVersion: 0,
      })
      formData.append("pinataOptions", options)

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        },
      )

      return await res.json()
    }

    async function registerTrafficLightDetection(cid: string) {
      if (!state.item) return
      if (!provider) return

      const walletClient = createWalletClient({
        chain: chainToUse,
        transport: custom<IProvider>(provider),
      })

      const [ address ] = await walletClient.getAddresses()

      const args: TrafficLightDetection = {
        id: BigInt(state.item.id),
        lat: BigInt(Math.floor(state.item.lat * 1e7)),
        lng: BigInt(Math.floor(state.item.lon * 1e7)),
        orientation: BigInt(0),
        cid,
        topLeft_x: BigInt(detectedObjects[0].topLeft_x),
        topLeft_y: BigInt(detectedObjects[0].topLeft_y),
        width: BigInt(detectedObjects[0].width),
        height: BigInt(detectedObjects[0].height),
        score: BigInt(Math.floor(detectedObjects[0].score * 1e7)),
      }
      console.log("writing")
      await walletClient.writeContract({
        account: address,
        abi: trafficDataAbi,
        functionName: "registerTrafficLightDetection",
        address: TRAFFIC_DATA_CONTRACT_ADDRESS,
        args: [
          args,
        ],
      })
      console.log("writing done")
    }

    setIsUploading(true)
    const res = await uploadToPinata()
    console.log(res)
    setIsUploading(false)
    setIsMinting(true)
    registerTrafficLightDetection(res.IpfsHash)
    setIsMinting(false)
  }
  console.log(state.item)
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
              <p className="p-1 pb-2 font-bold text-base bg-red-300/[.5]">
                {`${item.label} (${item.score.toFixed(3)})`}
              </p>
            </div>
          )
        })}
      </div>
      <img ref={imageContainerRef} src={state.image!} className="h-full w-full" />
      {(isUploading || isMinting) && (
        <div className="rounded-t-3xl bg-zinc-800 absolute inset-0 z-50 top-3/4">
          <div className="flex flex-col p-5 text-white">
            <h1 className="font-bold text-xl">Mint status</h1>
            <Divider></Divider>
            <Space direction="vertical" size="middle">
              <Space size="large">
                {match(isUploading)
                  .with(false, () => <CheckCircle size={32} color="#0f0" weight="fill" />)
                  .with(true, () => (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  ))
                  .otherwise(() => <Hourglass size={32} color="#ffebeb" weight="fill" />)}
                <p>
                  {match(isUploading)
                    .with(true, () => "Uploading images")
                    .with(false, () => "Uploaded")
                    .otherwise(() => "Waiting to upload images")}
                </p>
              </Space>
              <Space size="large">
                {match(isMinting)
                  .with(false, () => <CheckCircle size={32} color="#0f0" weight="fill" />)
                  .with(true, () => (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  ))
                  .otherwise(() => <Hourglass size={32} color="#ffebeb" weight="fill" />)}
                <p>
                  {match(isMinting)
                    .with(true, () => "Minting to manta network")
                    .with(false, () => "Minted")
                    .otherwise(() => "Waiting to mint to manta network")}
                </p>
              </Space>
            </Space>
          </div>
        </div>
      )}
      <div className="absolute flex flex-row justify-center mb-5 w-full bottom-0">
        <FillButton onClick={mintClickHandler}>
          <p>Mint</p>
        </FillButton>
      </div>
    </div>
  )
}

export default ImageDetection

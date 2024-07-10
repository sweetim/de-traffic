import {
  chainToUse,
  convertNumberToChainBigInt,
  TRAFFIC_DATA_CONTRACT_ADDRESS,
  TrafficLightDetectionFromChain,
} from "@/contract"
import { trafficDataAbi } from "@/generated"
import { TrafficLightOSMInfo } from "@/hooks/useOSMTrafficLightInfo"
import SpinningCircle from "@/icons/SpinningCircle"
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

import {
  useLocation,
  useNavigate,
} from "react-router-dom"
import { match } from "ts-pattern"
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
} from "viem"

type DetectedObjects = {
  normalize: {
    topLeft_x: number
    topLeft_y: number
    width: number
    height: number
  }
  visualize: {
    topLeft_x: number
    topLeft_y: number
    width: number
    height: number
  }
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
  const navigate = useNavigate()

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
            normalize: {
              topLeft_x: item.xmin / w,
              topLeft_y: item.ymin / h,
              width: (item.xmax - item.xmin) / w,
              height: (item.ymax - item.ymin) / h,
            },
            visualize: {
              topLeft_x: Math.floor((item.xmin / w) * imageWidth),
              topLeft_y: Math.floor((item.ymin / h) * imageHeight),
              width: Math.floor((item.xmax - item.xmin) / w * imageWidth),
              height: Math.floor((item.ymax - item.ymin) / h * imageHeight),
            },
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

      const publicClient = createPublicClient({
        chain: chainToUse,
        transport: http(),
      })

      const [ address ] = await walletClient.getAddresses()

      const args: TrafficLightDetectionFromChain = {
        id: BigInt(state.item.id),
        lat: convertNumberToChainBigInt(state.item.lat),
        lng: convertNumberToChainBigInt(state.item.lon),
        orientation: BigInt(0),
        cid,
        topLeft_x: convertNumberToChainBigInt(detectedObjects[0].normalize.topLeft_x),
        topLeft_y: convertNumberToChainBigInt(detectedObjects[0].normalize.topLeft_y),
        width: convertNumberToChainBigInt(detectedObjects[0].normalize.width),
        height: convertNumberToChainBigInt(detectedObjects[0].normalize.height),
        score: convertNumberToChainBigInt(detectedObjects[0].score),
      }

      console.log("writing to chain")
      await publicClient.waitForTransactionReceipt({
        hash: await walletClient.writeContract({
          account: address,
          abi: trafficDataAbi,
          functionName: "registerTrafficLightDetection",
          address: TRAFFIC_DATA_CONTRACT_ADDRESS,
          args: [
            args,
          ],
        }),
      })
      console.log("writing done")
    }

    setIsUploading(true)
    const res = await uploadToPinata()
    console.log(res)
    setIsUploading(false)

    setIsMinting(true)
    await registerTrafficLightDetection(res.IpfsHash)
    setIsMinting(false)

    if (!state.item) return

    navigate(
      `/app/collection/${state.item.id}`,
      {
        state: {
          isNewlyMinted: true,
        },
      },
    )
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
                top: `${Math.floor(item.visualize.topLeft_y)}px`,
                left: `${Math.floor(item.visualize.topLeft_x)}px`,
                width: `${Math.floor(item.visualize.width)}px`,
                height: `${Math.floor(item.visualize.height)}px`,
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
        <div className="rounded-t-3xl bg-zinc-800 absolute bottom-0 z-50 w-full">
          <div className="flex flex-col p-5 text-white">
            <h1 className="font-bold text-xl">Mint status</h1>
            <Divider></Divider>
            <Space direction="vertical" size="middle">
              <Space size="large">
                {match(isUploading)
                  .with(false, () => <CheckCircle size={32} color="#0f0" weight="fill" />)
                  .with(true, () => <SpinningCircle />)
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
                  .with(true, () => <SpinningCircle />)
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

import {
  convertTrafficLightDetectionFromChain,
  TRAFFIC_DATA_CONTRACT_ADDRESS,
} from "@/contract"
import { useReadTrafficDataGetAllTrafficLightDetection } from "@/generated"
import { useWalletInfo } from "@/hooks/useWalletInfo"
import TrafficLightDetectionImage from "@/modules/collection/TrafficLightDetectionImage"
import {
  ArrowLeft,
  Confetti,
  SpinnerGap,
} from "@phosphor-icons/react"
import {
  Map,
  Marker,
} from "@vis.gl/react-google-maps"
import {
  Avatar,
  Modal,
  Space,
  Statistic,
} from "antd"
import {
  FC,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  Link,
  useLocation,
  useParams,
} from "react-router-dom"

export type CollectionItemPageParams = {
  id: string
}

export type CollectionIdState = {
  isNewlyMinted?: boolean
}

const CollectionIdPage: FC = () => {
  const { id } = useParams<CollectionItemPageParams>()
  const location = useLocation()
  const state = location.state as CollectionIdState

  const { walletAddress } = useWalletInfo()

  const { data: allTrafficLightDetection } = useReadTrafficDataGetAllTrafficLightDetection({
    address: TRAFFIC_DATA_CONTRACT_ADDRESS,
    args: [
      walletAddress!,
    ],
  })
  console.log({ allTrafficLightDetection })
  const trafficLightDetection = allTrafficLightDetection?.filter(item => Number(item.id) === Number(id))
    .filter(item => Number(item.id) !== 2088386485)

  const renderTrafficLightDetection = useMemo(() => {
    if (!trafficLightDetection) return
    if (trafficLightDetection.length === 0) return

    const [ itemFromChain ] = trafficLightDetection
    console.log(itemFromChain, trafficLightDetection)
    const item = convertTrafficLightDetectionFromChain(itemFromChain)

    return (
      <div className="h-full w-full flex flex-col">
        <div className="p-3 bg-zinc-800 flex flex-row justify-between">
          <Space align="center">
            <Link to={".."} relative="path">
              <button className="hover:bg-zinc-700 rounded-full p-2">
                <ArrowLeft size={26} color="#ffebeb" weight="fill" />
              </button>
            </Link>
            <h1 className="text-white text-lg capitalize">{item.id.toString()}</h1>
          </Space>
        </div>
        <div className="h-full overflow-auto no-scrollbar">
          <TrafficLightDetectionImage item={item} />
          <div className="grid grid-cols-2 gap-2 p-2">
            <div className="row-span-3 bg-zinc-600 rounded-xl">
              <Map
                className="h-full w-full"
                defaultCenter={{
                  lat: item.lat,
                  lng: item.lng,
                }}
                defaultZoom={18}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
              >
                <Marker
                  position={{
                    lat: item.lat,
                    lng: item.lng,
                  }}
                />
              </Map>
            </div>
            <div className="bg-zinc-600 rounded-xl p-2">
              <Statistic
                title="Latitude"
                value={Number(item.lat) / 1e7}
                precision={6}
              />
            </div>
            <div className="bg-zinc-600 rounded-xl p-2">
              <Statistic
                title="Longitude"
                value={Number(item.lng) / 1e7}
                precision={6}
              />
            </div>
            <div className="bg-zinc-600 rounded-xl p-2">
              <Statistic
                title="Orientation"
                value={Number(item.orientation) / 1e7}
                precision={6}
              />
            </div>
            <div className="bg-zinc-600 rounded-xl p-2">
              <Statistic
                title="Status"
                prefix={<SpinnerGap size={22} color="orange" weight="fill" />}
                value={"Validating"}
              />
            </div>
            <div className="bg-zinc-600 rounded-xl p-2">
              <Statistic
                title="CID"
                value={`${item.cid.slice(0, 8)}...`}
                precision={6}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }, [ trafficLightDetection ])

  const [ isModalOpen, setIsModalOpen ] = useState(false)

  useEffect(() => {
    if (state?.isNewlyMinted) {
      setIsModalOpen(true)
    }
  }, [ state?.isNewlyMinted ])

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Modal centered footer={null} open={isModalOpen} onCancel={handleCancel}>
        <div className="w-full flex flex-col items-center justify-center py-10">
          <Space direction="vertical" size="large" align="center">
            <Confetti size={64} color="#ffebeb" weight="duotone" />
            <h1 className="text-2xl">
              Congratulations
            </h1>
            <h1 className="text-base">
              <strong>{id}</strong> minted successfully
            </h1>

            <Space size="middle">
              <Avatar size={32} src="/logo.jpg"></Avatar>
              <p className="text-2xl">
                <strong>10</strong> TRFK
              </p>
            </Space>
            <p>deposited to your wallet</p>
          </Space>
        </div>
      </Modal>
      {renderTrafficLightDetection}
    </div>
  )
}

export default CollectionIdPage

import { TRAFFIC_DATA_CONTRACT_ADDRESS } from "@/contract"
import { useReadTrafficDataGetAllTrafficLightDetection } from "@/generated"
import { useOSMTrafficLightInfo } from "@/hooks/useOSMTrafficLightInfo"
import { useWalletInfo } from "@/hooks/useWalletInfo"
import { Circle } from "@/modules/Circles"
import {
  CheckCircle,
  Confetti,
  Download,
  GasPump,
  Info,
  Wallet,
} from "@phosphor-icons/react"
import {
  AdvancedMarker,
  Map,
} from "@vis.gl/react-google-maps"
import {
  Avatar,
  Col,
  Modal,
  Row,
  Space,
  Tag,
} from "antd"
import clsx from "clsx"
import {
  GpsPoint,
  Haversine,
} from "haversine-position"
import {
  FC,
  useState,
} from "react"
import {
  Link,
  useLocation,
} from "react-router-dom"
import "./MapsPage.css"

const DEFAULT_LOCATION = {
  center: {
    lat: 35.628970143772975,
    lng: 139.7771481883018,
  },
  radius_m: 1000,
  zoom: 16,
}

const origin: GpsPoint = {
  lat: DEFAULT_LOCATION.center.lat,
  lng: DEFAULT_LOCATION.center.lng,
}

const haversine = new Haversine(origin)

const AppTrafficDataPage: FC = () => {
  const { walletAddress, balance_ticketErc20 } = useWalletInfo()
  const { pathname } = useLocation()

  const { trafficLights: osmTrafficLights } = useOSMTrafficLightInfo(
    DEFAULT_LOCATION.center.lat,
    DEFAULT_LOCATION.center.lng,
    DEFAULT_LOCATION.radius_m,
  )

  const currentSelectedId = Number(pathname.split("/").pop())

  const { data: allTrafficLightDetection } = useReadTrafficDataGetAllTrafficLightDetection({
    address: TRAFFIC_DATA_CONTRACT_ADDRESS,
    args: [
      walletAddress!,
    ],
  })

  const intersectTrafficLights = osmTrafficLights.map(item => ({
    ...item,
    isIntersect: haversine.getDistance({
      lat: item.lat,
      lng: item.lon,
    }) < 300,
  }))

  intersectTrafficLights.sort((a, b) => Number(a.isIntersect) - Number(b.isIntersect))
    .reverse()

  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ isModalCompleteOpen, setIsModalCompleteOpen ] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const showCompleteModal = () => {
    setIsModalCompleteOpen(true)
  }

  const handleCompleteCancel = () => {
    setIsModalCompleteOpen(false)
  }

  const totalSelectedTrafficLight = intersectTrafficLights.filter(item => item.isIntersect).length
  console.log(intersectTrafficLights.filter(item => item.isIntersect).map(item => item.id))
  async function extractConfirmHandler() {
    handleCancel()
    showCompleteModal()
  }

  async function extractDownloadHandler() {
    const blob = new Blob(
      [ JSON.stringify(intersectTrafficLights) ],
      { type: "application/json" },
    )
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${1724230090091}-traffic-lights.zip`
    link.click()
  }

  return (
    <>
      <Modal
        title=""
        centered
        open={isModalCompleteOpen}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={handleCompleteCancel}
      >
        <Space className="w-full py-5" direction="vertical" size="large" align="center">
          <Confetti size={128} color="#ffebeb" weight="duotone" />
          <Space direction="vertical" size="small" align="center">
            <h1 className="text-2xl">Congratulations</h1>
            <p>extraction is completed</p>
            <p>zip file is ready to download</p>
          </Space>
          <Tag className="text-base px-2" color="orange">{`${1724230090091}-traffic-lights.zip`}</Tag>
          <button
            onClick={extractDownloadHandler}
            className="bg-zinc-900 hover:bg-zinc-700 text-white px-20 rounded-3xl hover:text-white py-3"
          >
            DOWNLOAD
          </button>
        </Space>
      </Modal>
      <Modal
        title=""
        centered
        open={isModalOpen}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={handleCancel}
      >
        <div className="flex flex-col justify-center items-center py-5 space-y-2">
          <Space direction="vertical" size="large" align="center">
            <Avatar src={"/logo.jpg"} size={48} />
            <p className="text-gray-300">traffic lights selected</p>
            <h1 className="text-3xl">{totalSelectedTrafficLight}</h1>
            <Space>
              <Info size={26} color="#ffebeb" weight="duotone" />
              <p>extraction cost is 1 traffic light = 1 TRFK</p>
            </Space>
          </Space>
          <table className="table-fixed border-separate border-spacing-6 align-middle [&_:is(th,td):where(:nth-child(1))]:text-right [&_:is(th,td):where(:nth-child(2))]:text-center">
            <tbody>
              <tr>
                <td>
                  <div className="flex flex-row justify-center items-center align-middle">
                    <Wallet size={26} color="#ffebeb" weight="duotone" />
                    <p className="pl-3">Wallet balance</p>
                  </div>
                </td>
                <td>
                  <div className="flex flex-row justify-center items-center align-middle">
                    <span className="text-3xl px-2">{Number(balance_ticketErc20)}</span>
                    <Tag color="orange">TRFK</Tag>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Total cost</td>
                <td className="align-middle justify-center">
                  <div className="flex flex-row justify-center items-center align-middle">
                    <span className="text-3xl px-2">{totalSelectedTrafficLight * 1}</span>
                    <Tag color="orange">TRFK</Tag>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="flex flex-row justify-center items-center align-middle">
                    <GasPump size={26} color="#ffebeb" weight="duotone" />
                    <p className="pl-3">Estimated gas fee</p>
                  </div>
                </td>
                <td>
                  <div className="flex flex-row justify-center items-center align-middle">
                    <span className="text-3xl px-2">{0.001632}</span>
                    <Tag color="blue">ETH</Tag>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={extractConfirmHandler}
            className="bg-zinc-900 hover:bg-zinc-700 text-white px-20 rounded-3xl hover:text-white py-3"
          >
            CONFIRM
          </button>
        </div>
      </Modal>
      <Row className="h-full">
        <Col span={4} className="h-full">
          <ul className="h-[92%] overflow-auto">
            {intersectTrafficLights.map(item => {
              const trafficIdItemClassName = clsx(
                "w-full text-white hover:text-white py-2 hover:bg-zinc-800",
                {
                  "bg-zinc-800": currentSelectedId === Number(item.id),
                },
              )

              return (
                <Link to={`id/${item.id}`} key={`${item.id}`}>
                  <li className={trafficIdItemClassName}>
                    <Space>
                      <Avatar
                        size={32}
                        src={<CheckCircle size={22} color={`${item.isIntersect ? "lime" : "pink"}`} weight="fill" />}
                      />
                      {item.id.toString()}
                    </Space>
                  </li>
                </Link>
              )
            })}
          </ul>
          <button
            onClick={showModal}
            className="w-full capitalize h-[8%] bg-zinc-800 hover:bg-zinc-700 text-white px-5 hover:text-white py-3"
          >
            <Space size="large">
              <Download size={26} color="#ffebeb" weight="duotone" />
              <p>EXTRACT</p>
            </Space>
          </button>
        </Col>
        <Col span={20}>
          <div className="h-full w-full">
            <Map
              className="h-full w-full"
              defaultCenter={DEFAULT_LOCATION.center}
              defaultZoom={DEFAULT_LOCATION.zoom}
              gestureHandling={"greedy"}
              mapId={"4f6dde3310be51d7"}
              disableDefaultUI={true}
              tilt={0}
            >
              <Circle
                center={{
                  lat: DEFAULT_LOCATION.center.lat,
                  lng: DEFAULT_LOCATION.center.lng,
                }}
                radius={300}
                draggable
                editable
                fillColor={"#ccc"}
                fillOpacity={0.3}
                onCenterChanged={(ev) => console.log(ev)}
              />
              {intersectTrafficLights.map((item) => (
                <AdvancedMarker
                  key={item.id}
                  position={{
                    lat: item.lat,
                    lng: item.lon,
                  }}
                >
                  {item.isIntersect
                    ? <div className="pulsating-circle-traffic-capture" />
                    : <div className="pulsating-circle-traffic" />}
                </AdvancedMarker>
              ))}
            </Map>
          </div>
          {/* <Outlet /> */}
        </Col>
      </Row>
    </>
  )
}

export default AppTrafficDataPage

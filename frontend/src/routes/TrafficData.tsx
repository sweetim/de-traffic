import {
  Badge,
  Button,
  Card,
  Carousel,
  Flex,
  Form,
  Input,
  List,
  Radio,
} from "antd"
import GoogleMapReact from "google-map-react"
import { FC } from "react"
import { v4 as uuidv4 } from "uuid"
import { useAccount } from "wagmi"
import { useWriteTrafficDataRegisterTrafficLight } from "../generated"
const CONTRACT_ADDRESS = "0xe441CF0795aF14DdB9f7984Da85CD36DB1B8790d"
const TrafficDataPage: FC = () => {
  const account = useAccount()
  const { writeContractAsync } = useWriteTrafficDataRegisterTrafficLight()

  const defaultProps = {
    center: {
      lat: 35.627992493337665,
      lng: 139.77536944338857,
    },
    zoom: 18,
  }
  const renderMarkers = (map: any, maps: any) => {
    const marker = new maps.Marker({
      position: { lat: 35.627992493337665, lng: 139.77536944338857 },
      map,
      title: "traffic light",
    })
    return marker
  }

  /* eslint-disable  @typescript-eslint/no-unused-vars */
  const data = Array(10).fill(0).map(_ => ({
    title: uuidv4().substring(10),
  }))

  type FieldType = {
    lat: number
    lng: number
    orientation: number
    type: string
  }

  const INDEX_ACTIVE = 3
  const formInitialValue: FieldType = {
    lat: 35.627992,
    lng: 139.775369,
    orientation: 2.321213,
    type: "vehicle",
  }

  type TrafficLight = {
    owner: `0x${string}`
    lat: bigint
    lng: bigint
    orientation: bigint
    uri: string[]
    validationStatus: number
  }

  const updateTrafficFormHandler = async (data: FieldType) => {
    if (!account) return

    const trafficLight: TrafficLight = {
      owner: account.address!,
      lat: BigInt(data.lat * Math.pow(10, 6)),
      lng: BigInt(data.lng * Math.pow(10, 6)),
      orientation: BigInt(data.orientation * Math.pow(10, 6)),
      uri: [],
      validationStatus: 0,
    }
    console.log(trafficLight)
    await writeContractAsync({
      address: CONTRACT_ADDRESS,
      args: [ trafficLight ],
    })
    console.log(data)
  }

  return (
    <Flex className="h-full">
      <div className="w-1/3">
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item className={`${index === INDEX_ACTIVE ? "bg-slate-300" : ""} hover:bg-slate-200`}>
              <List.Item.Meta
                title={item.title}
              />
            </List.Item>
          )}
        />
      </div>
      <div className="bg-slate-200 h-full w-1/3">
        <Carousel>
          <img className="w-80 h-1/3" src="original.png" alt="" />
          <img className="w-80 h-1/3" src="annotated.png" alt="" />
        </Carousel>
        <div className="p-3">
          <Card title={data[INDEX_ACTIVE].title} bordered={true}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={formInitialValue}
              onFinish={updateTrafficFormHandler}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="latitude"
                name="lat"
                rules={[ { required: true, message: "Please input latitude!" } ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="longitude"
                name="lng"
                rules={[ { required: true, message: "Please input longitude!" } ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="orientation"
                name="orientation"
                rules={[ { required: true, message: "Please input orientation!" } ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Form Layout" name="type">
                <Radio.Group>
                  <Radio.Button value="pedestrian">Pedestrian</Radio.Button>
                  <Radio.Button value="vehicle">Vehicle</Radio.Button>
                  <Radio.Button value="train">Train</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Card title="NFT" className="my-2" extra={<Badge count={68} style={{ backgroundColor: "#52c41a" }} />}>
            <p>owned by</p>
            <p className="font-bold">0x4538Df273c05289DC7491a6cf01acF54F3D1F189</p>
          </Card>
        </div>
      </div>
      <div className="w-full h-full bg-red-300">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAlVCBMD_TE7H7jcUzV1u37ZKBx5yHDNzQ" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        >
          <img className="rotate-45" src="arrow.jpg" alt="" />
        </GoogleMapReact>
      </div>
    </Flex>
  )
}

export default TrafficDataPage

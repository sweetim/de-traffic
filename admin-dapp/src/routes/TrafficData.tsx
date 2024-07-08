import { CheckOutlined } from "@ant-design/icons"
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
import {
  FC,
  useEffect,
  useState,
} from "react"
import { useAccount } from "wagmi"
import { CONTRACT_ADDRESS } from "../contract"
import {
  useReadTrafficDataGetTrafficLights,
  useWriteTrafficDataRegisterTrafficLight,
} from "../generated"
const TrafficDataPage: FC = () => {
  const account = useAccount()

  const { writeContractAsync } = useWriteTrafficDataRegisterTrafficLight()
  const { data: trafficLights, isSuccess } = useReadTrafficDataGetTrafficLights({
    address: CONTRACT_ADDRESS,
  })

  type FieldType = {
    lat: number
    lng: number
    orientation: number
    type: string
    owner: `0x${string}`
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

  const [ activeIndex, setActiveIndex ] = useState(0)
  function itemClickHandler(index: number) {
    setActiveIndex(index)
  }

  const listItems: FieldType[] = trafficLights?.map(item => ({
    lat: Number(item.lat) / Math.pow(10, 6),
    lng: Number(item.lng) / Math.pow(10, 6),
    orientation: Number(item.orientation) / Math.pow(10, 6),
    type: "",
    owner: item.owner,
  })) || []
  const [ form ] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(listItems[activeIndex])
  }, [ form, activeIndex, listItems ])

  const renderMarker = (map: any, maps: any) => {
    console.log("r")
    if (!listItems[activeIndex]) return
    const marker = new maps.Marker({
      position: {
        lat: listItems[activeIndex].lat,
        lng: listItems[activeIndex].lng,
      },
      map,
      title: "traffic light",
    })
    console.log("here")
    return marker
  }

  const DEFAULT_PROPS = {
    center: {
      lat: 35.627992493337665,
      lng: 139.77536944338857,
    },
    zoom: 18,
  }
  return (
    <>
      {isSuccess
        ? (
          <Flex className="h-full">
            <div className="w-1/3">
              <List
                itemLayout="horizontal"
                dataSource={listItems}
                renderItem={(_, index) => (
                  <List.Item
                    className={`${index === activeIndex ? "bg-slate-300" : ""} hover:bg-slate-200`}
                    onClick={() => itemClickHandler(index)}
                  >
                    <List.Item.Meta
                      className="px-2"
                      title={
                        <>
                          <Badge className="pr-2" count={<CheckOutlined style={{ color: "#0f0" }} />} />
                          {index.toString()}
                        </>
                      }
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
                <Card title={activeIndex.toString()} bordered={true}>
                  <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={listItems[activeIndex]}
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
                  <p className="font-bold">{listItems[activeIndex].owner}</p>
                </Card>
              </div>
            </div>
            <div className="w-full h-full bg-red-300">
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyAlVCBMD_TE7H7jcUzV1u37ZKBx5yHDNzQ" }}
                defaultCenter={DEFAULT_PROPS.center}
                defaultZoom={DEFAULT_PROPS.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => renderMarker(map, maps)}
              >
                {/* <img className="rotate-45" src="arrow.jpg" alt="" /> */}
              </GoogleMapReact>
            </div>
          </Flex>
        )
        : <p>loading..</p>}
    </>
  )
}

export default TrafficDataPage

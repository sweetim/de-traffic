import { Badge, Button, Card, Carousel, Flex, Form, Input, Layout, List, Radio } from 'antd'
import GoogleMapReact from 'google-map-react';
import { v4 as uuidv4 } from 'uuid';

const { Header, Content } = Layout;

function App() {
  const defaultProps = {
    center: {
      lat: 35.627992493337665,
      lng: 139.77536944338857
    },
    zoom: 18
  };

  function connectClickHandler() {

  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const renderMarkers = (map: any, maps: any) => {
    const marker = new maps.Marker({
      position: { lat: 35.627992493337665, lng: 139.77536944338857 },
      map,
      title: 'traffic light'
    });
    return marker;
  };

  /* eslint-disable  @typescript-eslint/no-unused-vars */
  const data = Array(10).fill(0).map(_ => ({
    title: uuidv4().substring(10)
  }))

  type FieldType = {
    lat: number,
    lng: number,
    orientation: number,
    type: string
  }

  const INDEX_ACTIVE = 3
  const formInitialValue: FieldType = {
    lat: 35.627992493337665,
    lng: 139.77536944338857,
    orientation: 2.3212131212,
    type: "vehicle"
  }
  return (
    <Layout className='h-screen w-full' >
      <Header className="!p-3">
        <Flex className="h-full"
          justify="end"
          align="center">
          <Button onClick={connectClickHandler}>Connect</Button>
        </Flex>
      </Header>
      <Content className='h-full'>
        <Flex className='h-full'>
          <div className='w-1/3'>
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
          <div className='bg-slate-200 h-full w-1/3'>
            <Carousel>
              <img className='w-80 h-1/3' src="original.png" alt="" />
              <img className='w-80 h-1/3' src="annotated.png" alt="" />
            </Carousel>
            <div className='p-3'>
              <Card title={data[INDEX_ACTIVE].title} bordered={true} >
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: 600 }}
                  initialValues={formInitialValue}
                  autoComplete="off"
                >
                  <Form.Item<FieldType>
                    label="latitude"
                    name="lat"
                    rules={[{ required: true, message: 'Please input latitude!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="longitude"
                    name="lng"
                    rules={[{ required: true, message: 'Please input longitude!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item<FieldType>
                    label="orientation"
                    name="orientation"
                    rules={[{ required: true, message: 'Please input orientation!' }]}
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

              <Card title="NFT" className='my-2' extra={ <Badge count={68} style={{ backgroundColor: '#52c41a' }} />}>
                <p>owned by</p>
                <p className='font-bold'>0x4538Df273c05289DC7491a6cf01acF54F3D1F189</p>
              </Card>


            </div>
          </div>
          <div className='w-full h-full bg-red-300'>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyAlVCBMD_TE7H7jcUzV1u37ZKBx5yHDNzQ" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            >
              <img className='rotate-45' src="arrow.jpg" alt="" />
            </GoogleMapReact>
          </div>
        </Flex>
      </Content>
    </Layout>
  )
}

export default App

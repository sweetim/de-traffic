import { FC } from "react"

import {
  Table,
  TableProps,
  Tag,
} from "antd"
import { CONTRACT_ADDRESS } from "../contract"
import { useReadTrafficDataGetAllValidators } from "../generated"

type ValidatorMetadata = {
  name: string
  owner: `0x${string}`
  supportedModels: string[]
  validatedCount: number
}

const ValidatorPage: FC = () => {
  const { data, isSuccess } = useReadTrafficDataGetAllValidators({
    address: CONTRACT_ADDRESS,
  })
  console.log(data)
  const columns: TableProps<ValidatorMetadata>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Supported Models",
      dataIndex: "supportedModels",
      key: "supportedModels",
      render: (_, { supportedModels }) => (
        <>
          {supportedModels.map((model, i) => {
            const colors = [
              "orange",
              "cyan",
            ]
            return <Tag color={colors[i]}>{model}</Tag>
          })}
        </>
      ),
    },
    {
      title: "Validated count",
      dataIndex: "validatedCount",
      key: "validatedCount",
    },
  ]

  return (
    <>
      {isSuccess
        ? (
          <Table<ValidatorMetadata>
            dataSource={data.map(({ validatedCount, ...others }) => ({
              ...others,
              validatedCount: Number(validatedCount),
            })) as any}
            columns={columns}
          />
        )
        : <p>loading..</p>}
    </>
  )
}

export default ValidatorPage

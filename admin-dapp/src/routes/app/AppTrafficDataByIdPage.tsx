import { TrafficByIdPageParams } from "@/config/router"
import { FC } from "react"
import { useLoaderData } from "react-router-dom"

const AppTrafficDataByIdPage: FC = () => {
  const { trafficId } = useLoaderData() as TrafficByIdPageParams

  return <div>AppTrafficDataByIdPage {trafficId}</div>
}

export default AppTrafficDataByIdPage

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

const TrafficDataModule = buildModule("TrafficDataModule", (m) => {
  const trafficData = m.contract("TrafficData", [])

  return { trafficData }
})

export default TrafficDataModule

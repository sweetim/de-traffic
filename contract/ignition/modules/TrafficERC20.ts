import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

const TrafficERC20Module = buildModule("TrafficERC20Module", (m) => {
  const trafficERC20 = m.contract("TrafficERC20", [])

  return { trafficERC20 }
})

export default TrafficERC20Module

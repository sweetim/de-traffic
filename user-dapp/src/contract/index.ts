import { mantaSepoliaTestnet } from "viem/chains"

export const TRAFFIC_DATA_CONTRACT_ADDRESS = import.meta.env.VITE_TRAFFIC_DATA_CONTRACT_ADDRESS
export const TICKET_ERC20_CONTRACT_ADDRESS = import.meta.env.VITE_TICKET_ERC20_CONTRACT_ADDRESS

export const chainToUse = mantaSepoliaTestnet

export type TrafficLightDetection = {
  id: bigint
  lat: bigint
  lng: bigint
  orientation: bigint
  cid: string
  topLeft_x: bigint
  topLeft_y: bigint
  width: bigint
  height: bigint
  score: bigint
}

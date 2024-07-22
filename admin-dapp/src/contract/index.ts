export const TRAFFIC_DATA_CONTRACT_ADDRESS = import.meta.env.VITE_TRAFFIC_DATA_CONTRACT_ADDRESS
export const TICKET_ERC20_CONTRACT_ADDRESS = import.meta.env.VITE_TICKET_ERC20_CONTRACT_ADDRESS
export const CONTRACT_MIN_DECIMAL = 6

export type TrafficLightDetectionFromChain = {
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

export type TrafficLightDetection = {
  id: number
  lat: number
  lng: number
  orientation: number
  cid: string
  score: number
  normalize: {
    topLeft_x: number
    topLeft_y: number
    width: number
    height: number
  }
}

export function convertTrafficLightDetectionFromChain(input: TrafficLightDetectionFromChain): TrafficLightDetection {
  return {
    id: Number(input.id),
    lat: convertChainBigIntToNumber(input.lat),
    lng: convertChainBigIntToNumber(input.lng),
    orientation: convertChainBigIntToNumber(input.orientation),
    cid: input.cid,
    score: convertChainBigIntToNumber(input.score),
    normalize: {
      topLeft_x: convertChainBigIntToNumber(input.topLeft_x),
      topLeft_y: convertChainBigIntToNumber(input.topLeft_y),
      width: convertChainBigIntToNumber(input.width),
      height: convertChainBigIntToNumber(input.height),
    },
  }
}

export function convertNumberToChainBigInt(value: number) {
  return BigInt(Math.floor(value * Math.pow(10, CONTRACT_MIN_DECIMAL)))
}

export function convertChainBigIntToNumber(value: bigint) {
  return Number(value) / Math.pow(10, CONTRACT_MIN_DECIMAL)
}

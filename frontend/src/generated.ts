import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TrafficData
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const trafficDataAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'NewTrafficLightRegister',
  },
  {
    type: 'function',
    inputs: [],
    name: 'LLA_DECIMAL',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'imageUri', internalType: 'string', type: 'string' },
    ],
    name: 'addImages',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'getTrafficLightByIndex',
    outputs: [
      {
        name: '',
        internalType: 'struct TrafficData.TrafficLight',
        type: 'tuple',
        components: [
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'lat', internalType: 'uint256', type: 'uint256' },
          { name: 'lng', internalType: 'uint256', type: 'uint256' },
          { name: 'orientation', internalType: 'uint256', type: 'uint256' },
          { name: 'uri', internalType: 'string[]', type: 'string[]' },
          {
            name: 'validationStatus',
            internalType: 'enum TrafficData.TrafficLightValidationStatus',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'validator', internalType: 'address', type: 'address' }],
    name: 'getValidatorMetadata',
    outputs: [
      {
        name: '',
        internalType: 'struct TrafficData.ValidatorMetadata',
        type: 'tuple',
        components: [
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'owner', internalType: 'address', type: 'address' },
          {
            name: 'supportedModels',
            internalType: 'string[]',
            type: 'string[]',
          },
          { name: 'validatedCount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'input',
        internalType: 'struct TrafficData.TrafficLight',
        type: 'tuple',
        components: [
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'lat', internalType: 'uint256', type: 'uint256' },
          { name: 'lng', internalType: 'uint256', type: 'uint256' },
          { name: 'orientation', internalType: 'uint256', type: 'uint256' },
          { name: 'uri', internalType: 'string[]', type: 'string[]' },
          {
            name: 'validationStatus',
            internalType: 'enum TrafficData.TrafficLightValidationStatus',
            type: 'uint8',
          },
        ],
      },
    ],
    name: 'registerTrafficLight',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'supportedModels', internalType: 'string[]', type: 'string[]' },
    ],
    name: 'registerValidator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'trafficLights',
    outputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'lat', internalType: 'uint256', type: 'uint256' },
      { name: 'lng', internalType: 'uint256', type: 'uint256' },
      { name: 'orientation', internalType: 'uint256', type: 'uint256' },
      {
        name: 'validationStatus',
        internalType: 'enum TrafficData.TrafficLightValidationStatus',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'trafficLightsIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'lat', internalType: 'uint64', type: 'uint64' },
      { name: 'lng', internalType: 'uint64', type: 'uint64' },
      { name: 'orientation', internalType: 'uint64', type: 'uint64' },
      { name: 'uri', internalType: 'string[]', type: 'string[]' },
    ],
    name: 'updateTrafficLight',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      {
        name: 'validationStatus',
        internalType: 'enum TrafficData.TrafficLightValidationStatus',
        type: 'uint8',
      },
    ],
    name: 'updateValidationStatus',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'validatorIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'validators',
    outputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'validatedCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'validatorsAddresses',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficDataAbi}__
 */
export const useReadTrafficData = /*#__PURE__*/ createUseReadContract({
  abi: trafficDataAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"LLA_DECIMAL"`
 */
export const useReadTrafficDataLlaDecimal = /*#__PURE__*/ createUseReadContract(
  { abi: trafficDataAbi, functionName: 'LLA_DECIMAL' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"getIndex"`
 */
export const useReadTrafficDataGetIndex = /*#__PURE__*/ createUseReadContract({
  abi: trafficDataAbi,
  functionName: 'getIndex',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"getTrafficLightByIndex"`
 */
export const useReadTrafficDataGetTrafficLightByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: trafficDataAbi,
    functionName: 'getTrafficLightByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"getValidatorMetadata"`
 */
export const useReadTrafficDataGetValidatorMetadata =
  /*#__PURE__*/ createUseReadContract({
    abi: trafficDataAbi,
    functionName: 'getValidatorMetadata',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"trafficLights"`
 */
export const useReadTrafficDataTrafficLights =
  /*#__PURE__*/ createUseReadContract({
    abi: trafficDataAbi,
    functionName: 'trafficLights',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"trafficLightsIndex"`
 */
export const useReadTrafficDataTrafficLightsIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: trafficDataAbi,
    functionName: 'trafficLightsIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"validatorIndex"`
 */
export const useReadTrafficDataValidatorIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: trafficDataAbi,
    functionName: 'validatorIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"validators"`
 */
export const useReadTrafficDataValidators = /*#__PURE__*/ createUseReadContract(
  { abi: trafficDataAbi, functionName: 'validators' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"validatorsAddresses"`
 */
export const useReadTrafficDataValidatorsAddresses =
  /*#__PURE__*/ createUseReadContract({
    abi: trafficDataAbi,
    functionName: 'validatorsAddresses',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link trafficDataAbi}__
 */
export const useWriteTrafficData = /*#__PURE__*/ createUseWriteContract({
  abi: trafficDataAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"addImages"`
 */
export const useWriteTrafficDataAddImages =
  /*#__PURE__*/ createUseWriteContract({
    abi: trafficDataAbi,
    functionName: 'addImages',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"registerTrafficLight"`
 */
export const useWriteTrafficDataRegisterTrafficLight =
  /*#__PURE__*/ createUseWriteContract({
    abi: trafficDataAbi,
    functionName: 'registerTrafficLight',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"registerValidator"`
 */
export const useWriteTrafficDataRegisterValidator =
  /*#__PURE__*/ createUseWriteContract({
    abi: trafficDataAbi,
    functionName: 'registerValidator',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"updateTrafficLight"`
 */
export const useWriteTrafficDataUpdateTrafficLight =
  /*#__PURE__*/ createUseWriteContract({
    abi: trafficDataAbi,
    functionName: 'updateTrafficLight',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"updateValidationStatus"`
 */
export const useWriteTrafficDataUpdateValidationStatus =
  /*#__PURE__*/ createUseWriteContract({
    abi: trafficDataAbi,
    functionName: 'updateValidationStatus',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link trafficDataAbi}__
 */
export const useSimulateTrafficData = /*#__PURE__*/ createUseSimulateContract({
  abi: trafficDataAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"addImages"`
 */
export const useSimulateTrafficDataAddImages =
  /*#__PURE__*/ createUseSimulateContract({
    abi: trafficDataAbi,
    functionName: 'addImages',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"registerTrafficLight"`
 */
export const useSimulateTrafficDataRegisterTrafficLight =
  /*#__PURE__*/ createUseSimulateContract({
    abi: trafficDataAbi,
    functionName: 'registerTrafficLight',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"registerValidator"`
 */
export const useSimulateTrafficDataRegisterValidator =
  /*#__PURE__*/ createUseSimulateContract({
    abi: trafficDataAbi,
    functionName: 'registerValidator',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"updateTrafficLight"`
 */
export const useSimulateTrafficDataUpdateTrafficLight =
  /*#__PURE__*/ createUseSimulateContract({
    abi: trafficDataAbi,
    functionName: 'updateTrafficLight',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"updateValidationStatus"`
 */
export const useSimulateTrafficDataUpdateValidationStatus =
  /*#__PURE__*/ createUseSimulateContract({
    abi: trafficDataAbi,
    functionName: 'updateValidationStatus',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link trafficDataAbi}__
 */
export const useWatchTrafficDataEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: trafficDataAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link trafficDataAbi}__ and `eventName` set to `"NewTrafficLightRegister"`
 */
export const useWatchTrafficDataNewTrafficLightRegisterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: trafficDataAbi,
    eventName: 'NewTrafficLightRegister',
  })

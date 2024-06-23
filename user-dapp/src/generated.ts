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
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
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
    name: 'getAllValidators',
    outputs: [
      {
        name: '',
        internalType: 'struct TrafficData.ValidatorMetadata[]',
        type: 'tuple[]',
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
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTrafficLights',
    outputs: [
      {
        name: '',
        internalType: 'struct TrafficData.TrafficLight[]',
        type: 'tuple[]',
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
    stateMutability: 'nonpayable',
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
    inputs: [{ name: '_token', internalType: 'address', type: 'address' }],
    name: 'registerToken',
    outputs: [],
    stateMutability: 'nonpayable',
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
// TrafficERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const trafficErc20Abi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [
      { name: 'increasedSupply', internalType: 'uint256', type: 'uint256' },
      { name: 'cap', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20ExceededCap',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'cap', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC20InvalidCap',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"getAllValidators"`
 */
export const useReadTrafficDataGetAllValidators =
  /*#__PURE__*/ createUseReadContract({
    abi: trafficDataAbi,
    functionName: 'getAllValidators',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"getIndex"`
 */
export const useReadTrafficDataGetIndex = /*#__PURE__*/ createUseReadContract({
  abi: trafficDataAbi,
  functionName: 'getIndex',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"getTrafficLightByIndex"`
 */
export const useWriteTrafficDataGetTrafficLightByIndex =
  /*#__PURE__*/ createUseWriteContract({
    abi: trafficDataAbi,
    functionName: 'getTrafficLightByIndex',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"getTrafficLights"`
 */
export const useWriteTrafficDataGetTrafficLights =
  /*#__PURE__*/ createUseWriteContract({
    abi: trafficDataAbi,
    functionName: 'getTrafficLights',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"registerToken"`
 */
export const useWriteTrafficDataRegisterToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: trafficDataAbi,
    functionName: 'registerToken',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"getTrafficLightByIndex"`
 */
export const useSimulateTrafficDataGetTrafficLightByIndex =
  /*#__PURE__*/ createUseSimulateContract({
    abi: trafficDataAbi,
    functionName: 'getTrafficLightByIndex',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"getTrafficLights"`
 */
export const useSimulateTrafficDataGetTrafficLights =
  /*#__PURE__*/ createUseSimulateContract({
    abi: trafficDataAbi,
    functionName: 'getTrafficLights',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link trafficDataAbi}__ and `functionName` set to `"registerToken"`
 */
export const useSimulateTrafficDataRegisterToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: trafficDataAbi,
    functionName: 'registerToken',
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

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficErc20Abi}__
 */
export const useReadTrafficErc20 = /*#__PURE__*/ createUseReadContract({
  abi: trafficErc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficErc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadTrafficErc20Allowance = /*#__PURE__*/ createUseReadContract(
  { abi: trafficErc20Abi, functionName: 'allowance' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficErc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadTrafficErc20BalanceOf = /*#__PURE__*/ createUseReadContract(
  { abi: trafficErc20Abi, functionName: 'balanceOf' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficErc20Abi}__ and `functionName` set to `"cap"`
 */
export const useReadTrafficErc20Cap = /*#__PURE__*/ createUseReadContract({
  abi: trafficErc20Abi,
  functionName: 'cap',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficErc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadTrafficErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: trafficErc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficErc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadTrafficErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: trafficErc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficErc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadTrafficErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: trafficErc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link trafficErc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadTrafficErc20TotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: trafficErc20Abi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link trafficErc20Abi}__
 */
export const useWriteTrafficErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: trafficErc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link trafficErc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteTrafficErc20Approve = /*#__PURE__*/ createUseWriteContract(
  { abi: trafficErc20Abi, functionName: 'approve' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link trafficErc20Abi}__ and `functionName` set to `"mint"`
 */
export const useWriteTrafficErc20Mint = /*#__PURE__*/ createUseWriteContract({
  abi: trafficErc20Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link trafficErc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteTrafficErc20Transfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: trafficErc20Abi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link trafficErc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteTrafficErc20TransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: trafficErc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link trafficErc20Abi}__
 */
export const useSimulateTrafficErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: trafficErc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link trafficErc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateTrafficErc20Approve =
  /*#__PURE__*/ createUseSimulateContract({
    abi: trafficErc20Abi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link trafficErc20Abi}__ and `functionName` set to `"mint"`
 */
export const useSimulateTrafficErc20Mint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: trafficErc20Abi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link trafficErc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateTrafficErc20Transfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: trafficErc20Abi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link trafficErc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateTrafficErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: trafficErc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link trafficErc20Abi}__
 */
export const useWatchTrafficErc20Event =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: trafficErc20Abi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link trafficErc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchTrafficErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: trafficErc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link trafficErc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchTrafficErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: trafficErc20Abi,
    eventName: 'Transfer',
  })

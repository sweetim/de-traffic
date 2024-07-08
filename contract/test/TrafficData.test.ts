import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers"
import hre from "hardhat"

describe("TrafficData", function() {
  async function deployTrafficDataFixture() {
    const [ owner, user_1 ] = await hre.viem.getWalletClients()

    const trafficData = await hre.viem.deployContract("TrafficData", [])
    const ticketERC20 = await hre.viem.deployContract("TrafficERC20", [])

    const publicClient = await hre.viem.getPublicClient()

    const [ ownerAddress ] = await owner.getAddresses()

    return {
      owner,
      ownerAddress,
      user_1,
      trafficData,
      ticketERC20,
      publicClient,
    }
  }

  it("should register", async () => {
    const {
      ownerAddress,
      trafficData,
      ticketERC20,
      publicClient,
    } = await loadFixture(deployTrafficDataFixture)

    await publicClient.waitForTransactionReceipt({
      hash: await trafficData.write.registerToken([
        ticketERC20.address,
      ]),
    })

    await publicClient.waitForTransactionReceipt({
      hash: await trafficData.write.registerTrafficLightDetection([
        {
          id: BigInt(0),
          lat: BigInt(Math.floor(0 * 1e7)),
          lng: BigInt(Math.floor(0 * 1e7)),
          orientation: BigInt(0),
          cid: "cid",
          topLeft_x: BigInt(0),
          topLeft_y: BigInt(0),
          width: BigInt(0),
          height: BigInt(0),
          score: BigInt(Math.floor(0 * 1e7)),
        },
      ]),
    })

    const detectionResults = await trafficData.read.getAllTrafficLightDetection([
      ownerAddress,
    ])

    console.log(detectionResults)
  })

  describe("Deployment", () => {
    it("should able to deploy", async () => {
      const { trafficData } = await loadFixture(deployTrafficDataFixture)

      expect(trafficData.read.trafficLights.length).to.eq(+0)
      expect(await trafficData.read.trafficLightsIndex()).to.eq(BigInt(0))
      expect(trafficData.read.validatorsAddresses.length).to.eq(+0)
      expect(await trafficData.read.validatorIndex()).to.eq(BigInt(0))
    })
  })

  describe("Validator", () => {
    describe("registerValidator", () => {
      it("should able to register validator", async () => {
        const { trafficData, owner } = await loadFixture(deployTrafficDataFixture)

        const name = "validator"
        const supportedModels = [
          "yolov6",
          "yolov7",
        ]

        const tx = await trafficData.write.registerValidator([
          name,
          supportedModels,
        ])

        expect(
          (await trafficData.read.validatorsAddresses([
            BigInt(0),
          ])).toLocaleLowerCase(),
        ).to.be.eq(owner.account.address.toLocaleLowerCase())

        expect(await trafficData.read.validatorIndex()).to.eq(BigInt(1))
      })
    })

    describe("updateValidationStatus", () => {
      it("should update traffic validation status", async () => {
        const { trafficData, owner } = await loadFixture(deployTrafficDataFixture)

        const name = "validator"
        const supportedModels = [
          "yolov6",
          "yolov7",
        ]

        await trafficData.write.registerValidator([
          name,
          supportedModels,
        ])

        await trafficData.write.registerTrafficLight([
          {
            owner: owner.account.address,
            lat: BigInt(0),
            lng: BigInt(1),
            orientation: BigInt(2),
            uri: [ "abc" ],
            validationStatus: 0,
          },
        ])

        const id = BigInt(0)
        await trafficData.write.updateValidationStatus([
          id,
          2,
        ])

        const actual = await trafficData.read.getTrafficLightByIndex([ id ])

        expect(actual.validationStatus).to.be.eq(2)
      })
    })
  })

  describe("Traffic Light", () => {
    describe("registerTrafficLight", () => {
      it("should able to register traffic light", async () => {
        const { trafficData, owner } = await loadFixture(deployTrafficDataFixture)

        const name = "validator"
        const supportedModels = [
          "yolov6",
          "yolov7",
        ]

        await trafficData.write.registerValidator([
          name,
          supportedModels,
        ])

        expect(await trafficData.read.trafficLightsIndex()).to.eq(BigInt(0))
        await trafficData.write.registerTrafficLight([
          {
            owner: owner.account.address,
            lat: BigInt(0),
            lng: BigInt(1),
            orientation: BigInt(2),
            uri: [ "abc" ],
            validationStatus: 0,
          },
        ])
        expect(await trafficData.read.trafficLightsIndex()).to.eq(BigInt(1))
      })

      it("should emit event after register traffic light", async () => {
        const { trafficData, owner } = await loadFixture(deployTrafficDataFixture)

        const name = "validator"
        const supportedModels = [
          "yolov6",
          "yolov7",
        ]

        await trafficData.write.registerValidator([
          name,
          supportedModels,
        ])

        await trafficData.write.registerTrafficLight([
          {
            owner: owner.account.address,
            lat: BigInt(0),
            lng: BigInt(1),
            orientation: BigInt(2),
            uri: [ "abc" ],
            validationStatus: 0,
          },
        ])
        const [ log_1 ] = await trafficData.getEvents.NewTrafficLightRegister()
        expect(log_1.args.index).to.be.eq(BigInt(0))

        await trafficData.write.registerTrafficLight([
          {
            owner: owner.account.address,
            lat: BigInt(0),
            lng: BigInt(1),
            orientation: BigInt(2),
            uri: [ "abc" ],
            validationStatus: 0,
          },
        ])
        const [ log_2 ] = await trafficData.getEvents.NewTrafficLightRegister()
        expect(log_2.args.index).to.be.eq(BigInt(1))
      })

      it("should set default value for traffic validation status", async () => {
        const { trafficData, owner } = await loadFixture(deployTrafficDataFixture)

        const name = "validator"
        const supportedModels = [
          "yolov6",
          "yolov7",
        ]

        await trafficData.write.registerValidator([
          name,
          supportedModels,
        ])

        await trafficData.write.registerTrafficLight([
          {
            owner: owner.account.address,
            lat: BigInt(0),
            lng: BigInt(1),
            orientation: BigInt(2),
            uri: [ "abc" ],
            validationStatus: 3,
          },
        ])

        const actual = await trafficData.read.getTrafficLightByIndex([ BigInt(0) ], {})
        expect(actual.owner.toLocaleLowerCase()).to.be.eq(owner.account.address.toLocaleLowerCase())
        expect(actual.validationStatus).to.be.eq(0)
      })
    })
  })
})

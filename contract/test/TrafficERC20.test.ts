import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers"
import { expect } from "chai"
import hre from "hardhat"

describe("TrafficERC20", function() {
  async function deployTrafficERC20Fixture() {
    const [ owner, user_1 ] = await hre.viem.getWalletClients()

    const trafficERC20 = await hre.viem.deployContract("TrafficERC20", [])
    const publicClient = await hre.viem.getPublicClient()

    return {
      owner,
      user_1,
      trafficERC20,
      publicClient,
    }
  }

  it("should able to mint", async () => {
    const { trafficERC20, user_1 } = await loadFixture(deployTrafficERC20Fixture)

    expect(
      await trafficERC20.read.balanceOf([
        user_1.account.address,
      ]),
    ).to.be.eq(BigInt(0))

    await trafficERC20.write.mint([
      user_1.account.address,
      BigInt(1_000),
    ])

    expect(
      await trafficERC20.read.balanceOf([
        user_1.account.address,
      ]),
    ).to.be.eq(BigInt(1_000))
  })

  it("should able to transfer", async () => {
    const { trafficERC20, user_1, owner } = await loadFixture(deployTrafficERC20Fixture)

    await trafficERC20.write.mint([
      owner.account.address,
      BigInt(1_000),
    ])

    expect(
      await trafficERC20.read.balanceOf([
        owner.account.address,
      ]),
    ).to.be.eq(BigInt(1_000))

    expect(
      await trafficERC20.read.balanceOf([
        user_1.account.address,
      ]),
    ).to.be.eq(BigInt(0))

    await trafficERC20.write.approve([
      user_1.account.address,
      BigInt(1_000),
    ])

    await trafficERC20.write.transfer([
      user_1.account.address,
      BigInt(500),
    ])

    expect(
      await trafficERC20.read.balanceOf([
        owner.account.address,
      ]),
    ).to.be.eq(BigInt(500))

    expect(
      await trafficERC20.read.balanceOf([
        user_1.account.address,
      ]),
    ).to.be.eq(BigInt(500))
  })
})

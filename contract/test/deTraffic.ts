import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployDeTraffic() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const DeTraffic = await hre.ethers.getContractFactory("DeTraffic");
    const deTraffic = await DeTraffic.deploy();

    return { deTraffic, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should create traffic light", async function () {
      const { deTraffic } = await loadFixture(deployDeTraffic);

      await deTraffic.createTrafficLight(1, 2, 3, "abc")
      expect(deTraffic.getAllTrafficLight().length).to.equal(1);
    });

    it("Should update traffic light", async function () {
      const { deTraffic } = await loadFixture(deployDeTraffic);
      await deTraffic.updateTrafficLight(0, 1, 2, 3, "cde")


      expect(deTraffic.getAllTrafficLight()[0].uri).to.equal("cde");
    });
  });
});

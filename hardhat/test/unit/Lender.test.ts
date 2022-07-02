import { assert, expect } from "chai";
import { BigNumber } from "ethers";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { Address } from "hardhat-deploy/dist/types";
import { Lender, MockV3Aggregator, StableCoin } from "../../typechain";

describe("Lender", async () => {
  let Lenders: Lender,
    deployer: Address,
    mockV3Aggregator: MockV3Aggregator,
    StableCoin: StableCoin;

  beforeEach(async () => {
    // deploy contracts and mocks using hardhat deploy
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    Lenders = await ethers.getContract("Lender", deployer);
    StableCoin = await ethers.getContract("StableCoin", deployer);
    StableCoin.transferOwnership(Lenders.address);
    mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
  });
  describe("constructor", async () => {
    it("sets aggregator address correctly", async () => {
      const response = await Lenders.priceFeed();
      assert.equal(response, mockV3Aggregator.address);
    });
  });
  describe("depositing", async () => {
    it("should deposit ETH and recieve YUSD in exchange", async () => {
      const transactionResponse = await Lenders.deposit(
        ethers.utils.parseEther("1"),
        {
          value: ethers.utils.parseEther("1"),
        }
      );
      const deployerStableCoinbalance = await StableCoin.balanceOf(deployer);
      const contractETHBalance = await ethers.provider.getBalance(
        Lenders.address
      );
      const ETHtoUSDRate = await Lenders.getEthUSDPrice();
      assert.equal(
        deployerStableCoinbalance.toString(),
        contractETHBalance
          .mul(ETHtoUSDRate)
          .div(ethers.utils.parseEther("1"))
          .toString()
      );
    });
  });

  describe("withdraw", async () => {
    it("should list the right estimate of collateral amount", async () => {
      await Lenders.deposit(ethers.utils.parseEther("1"), {
        value: ethers.utils.parseEther("1"),
      });
      const response = await Lenders.estimateCollateralAmount(
        ethers.utils.parseEther("2000")
      );
      assert.equal(response.toString(), "1");
    });

    it("should withdraw the entire borrowed amount", async () => {
      await Lenders.deposit(ethers.utils.parseEther("1"), {
        value: ethers.utils.parseEther("1"),
      });
      const beforeWithdraw = await StableCoin.balanceOf(deployer);
      const response = await Lenders.withdraw(ethers.utils.parseEther("100"));
      const afterWithdraw = await StableCoin.balanceOf(deployer);
      assert.equal(
        beforeWithdraw.sub(ethers.utils.parseEther("100")).toString(),
        afterWithdraw.toString()
      );
    });
  });
});

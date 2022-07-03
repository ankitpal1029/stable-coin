import { HardhatRuntimeEnvironment, NetworkConfig } from "hardhat/types";
import { DeployFunction, DeployResult } from "hardhat-deploy/types";
import { network } from "hardhat";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { verify } from "../utils/verify";
import { ethers } from "ethers";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, log } = deployments;

  const { deployer } = await getNamedAccounts();
  console.log(deployer);
  const chainId = network.config.chainId;

  // console.log(networkConfig[chainId?.toString()])
  let ethUsdPriceFeedAddress;

  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    console.log(networkConfig);
    ethUsdPriceFeedAddress =
      networkConfig[chainId! as keyof typeof networkConfig]["ethUsdPriceFeed"];
  }

  // if the contract doesn't exist locally we deploy a minimal version of it
  // for local testing

  // use mock for say chainlink vrf or other smart contracts that our smart contract relies on

  const StableCoin: DeployResult = await deploy("StableCoin", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.name === "hardhat" ? 1 : 6,
  });
  // console.log(StableCoin.address);

  const args = [StableCoin.address, ethUsdPriceFeedAddress];
  const Lender: DeployResult = await deploy("Lender", {
    from: deployer,
    args: args, // put price feed address,
    log: true,
    waitConfirmations: network.name === "hardhat" ? 1 : 6,
  });

  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545/"
  );
  const deployerSigner = new ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );
  const stableCoinContract = new ethers.Contract(
    StableCoin.address,
    StableCoin.abi,
    deployerSigner
  );
  stableCoinContract.transferOwnership(Lender.address);

  // if (
  //   !developmentChains.includes(network.name) &&
  //   process.env.ETHERSCAN_API_KEY
  // ) {
  //   // verify
  //   await verify(fundMe.address, args);
  // }
  log("------------------------------");
};
export default func;
func.tags = ["all", "fundme"];

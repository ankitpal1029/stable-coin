const networkConfig = {
  4: {
    name: "rinkeby",
    ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
  },
  31337: {
    name: "hardhat",
    ethUsdPriceFeed: "0x",
  },
  80001: {
    name: "mumbai",
    ethUsdPriceFeed: "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada",
  },
};

const developmentChains = ["hardhat", "localhost"];

const DECIMALS = 8;
const INITIAL_ANSWER = 200000000000;

export { networkConfig, developmentChains, DECIMALS, INITIAL_ANSWER };

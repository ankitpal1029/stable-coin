import abi from "./TransactionsABI.json";
import lenderLocalDeployments from "../../hardhat/deployments/localhost/Lender.json";
import lenderRinkebyDeployments from "../../hardhat/deployments/rinkeby/Lender.json";

export const contractABI = abi.abi;
export const contractAddress = "0xFe04DFB66af39B035293bd002c10229c6E6c010b";

export const lenderContractABI =
  process.env.NODE_ENV === "development"
    ? lenderLocalDeployments.abi
    : lenderRinkebyDeployments.abi;
export const lenderContractAddrsss =
  process.env.NODE_ENV === "development"
    ? lenderLocalDeployments.address
    : lenderRinkebyDeployments.address;

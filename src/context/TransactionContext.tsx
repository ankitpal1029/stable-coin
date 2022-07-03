import { createContext, useContext, useEffect, useState } from "react";
import { Lender, MockV3Aggregator, StableCoin } from "../typechain";

import { ethers } from "ethers";
import {
  contractABI,
  contractAddress,
  lenderContractABI,
  lenderContractAddrsss,
} from "../utils/constants";
import { sign } from "crypto";

interface ITransactionContext {
  connectWallet: () => void;
  connectedAccount: string;
  formData: IFormData;
  setFormData: any;
  handleChange: (e: any, name: string) => void;
  // sendTransaction: () => void;
  getEthereumContract: () => void;
  getLendersContract: () => ethers.Contract;
  transactions: any[];
  isLoading: boolean;
}

interface IFormData {
  depositETH: string;
  returnYUSD: string;
}
declare global {
  interface Window {
    ethereum: any;
  }
}
export const TransactionContext = createContext<ITransactionContext>({
  connectWallet: () => {},
  connectedAccount: "",
  formData: { depositETH: "", returnYUSD: "" },
  setFormData: "",
  handleChange: () => {},
  // sendTransaction: () => {},
  getEthereumContract: () => {},
  getLendersContract: () => {
    return new ethers.Contract(
      "0x0",
      contractABI,
      new ethers.providers.Web3Provider(ethereum)
    );
  },
  transactions: [],
  isLoading: false,
});

export const useTransactionContext = () => useContext(TransactionContext);

const { ethereum } = window;

const getEthereumContract = () => {
  console.log(ethereum);
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const TransactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  console.log({ provider, signer, TransactionContract });
  return TransactionContract;
};

const getLendersContract = () => {
  console.log(ethereum);
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const LendersContract = new ethers.Contract(
    lenderContractAddrsss,
    lenderContractABI,
    signer
  );
  console.log({ provider, signer, LendersContract });
  return LendersContract;
};

export const TransactionProvider = ({ children }: { children: any }) => {
  const [connectedAccount, setConnectedAccount] = useState<string>("");
  const [formData, setFormData] = useState<IFormData>({
    depositETH: "",
    returnYUSD: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionCount, setTransactionCount] = useState<string | null>(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState<any[]>([]);

  const handleChange = (e: any, name: string) => {
    console.log(name);
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const isWalletConnected = async () => {
    if (!ethereum) {
      return alert("Please Install metamask");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    try {
      if (!accounts.length) {
        setConnectedAccount(accounts[0]);
        console.log("calling it..");
      } else {
        console.log("No Accounts found");
      }
      console.log(accounts);
    } catch (error) {
      console.error(error);

      throw new Error("No Ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Please Install metamask");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setConnectedAccount(accounts[0]);
      console.log("set account", accounts[0]);
    } catch (err) {
      console.warn(err);
      throw new Error("No Ethereum object");
    }
  };

  useEffect(() => {
    isWalletConnected();
    isWalletConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        formData,
        setFormData,
        handleChange,
        // sendTransaction,
        getEthereumContract,
        getLendersContract,
        transactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import Loader from "./Loader";
import { useTransactionContext } from "../context/TransactionContext";
import { ShortenAddress } from "../utils/shortenAddress";
import WithdrawModal from "./WithdrawModal";
import DepositModal from "./DepositModal";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({
  placeholder,
  name,
  type,
  // value,
  handleChange,
}: {
  placeholder: string;
  name: string;
  type: string;
  // value: string;
  handleChange: Function;
}) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      // value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );
};

const Welcome = () => {
  const { connectWallet, connectedAccount, formData, handleChange, isLoading } =
    useTransactionContext();

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-row flex-col items-start justify-between items-center md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-center flex-col md:mr-10 ">
          <h1 className=" text-3xl sm:text-5xl text-white text-gradient py-1">
            Get Loans on your ETH
            <br />
          </h1>
          <p className="text-left text-white mt-5 font-light md:w-9/12 w-11/12 text-base">
            Recieve YUSD (yamaze stable coin)
          </p>
          {!connectedAccount && (
            <button
              type="button"
              onClick={() => {
                connectWallet();
              }}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full ">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full ">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {connectedAccount
                    ? ShortenAddress(connectedAccount)
                    : "0xWalletAddress"}
                </p>
                <p className="text-white font-semibold text-sm">Ethereum</p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <label
              htmlFor="deposit-modal"
              className="btn modal-button text-white w-full mt-3 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
            >
              Deposit ETH
            </label>

            <label
              htmlFor="withdraw-modal"
              className="btn modal-button text-white w-full mt-3 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
            >
              Withdraw ETH
            </label>

            {/* {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
              >
                Send Now
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

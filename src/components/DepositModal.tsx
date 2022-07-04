import React, { useEffect, useState } from "react";
import { useTransactionContext } from "../context/TransactionContext";
import Input from "./Input";
import { ethers } from "ethers";

function DepositModal() {
  const {
    connectWallet,
    connectedAccount,
    formData,
    handleChange,
    isLoading,
    getLendersContract,
  } = useTransactionContext();
  const [conversionValue, setConversionValue] = useState("");

  useEffect(() => {
    const fetchPrice = async () => {
      const LendersContract = getLendersContract();
      const val = await LendersContract.getEthUSDPrice();
      setConversionValue(val.div(ethers.utils.parseEther("1")).toString());
    };
    fetchPrice();
  }, []);

  const handleSubmit = async () => {
    const LendersContract = getLendersContract();
    console.log(formData.depositETH);
    console.log(
      await LendersContract.deposit(
        ethers.utils.parseEther(formData.depositETH),
        {
          value: ethers.utils.parseEther(formData.depositETH),
        }
      )
    );
  };

  return (
    <div>
      <input type="checkbox" id="deposit-modal" className="modal-toggle" />
      <div className="modal blue-glassmorphism">
        <div className="modal-box relative ">
          <label
            htmlFor="deposit-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center ">
            <p>Exchange rate 1ETH: {conversionValue} YUSD</p>
            <Input
              placeholder="Amount ETH to deposit"
              name="addressTo"
              type="text"
              // value={addressTo}
              handleChange={(e: any) => handleChange(e, "depositETH")}
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer bg-red-700"
            >
              Send Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepositModal;

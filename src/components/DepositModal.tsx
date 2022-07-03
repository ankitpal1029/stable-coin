import React from "react";
import Input from "./Input";

const handleChange = () => {};
const handleSubmit = () => {};

function DepositModal() {
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
            <p>1ETH = 1000YUSD</p>
            <Input
              placeholder="Amount ETH to deposit"
              name="addressTo"
              type="text"
              // value={addressTo}
              handleChange={handleChange}
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

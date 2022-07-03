/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ILenderInterface extends ethers.utils.Interface {
  functions: {
    "deposit(uint256)": FunctionFragment;
    "estimateCollateralAmount(uint256)": FunctionFragment;
    "estimateTokenAmount(uint256)": FunctionFragment;
    "getLender(address)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "estimateCollateralAmount",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "estimateTokenAmount",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getLender", values: [string]): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "estimateCollateralAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "estimateTokenAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getLender", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Deposit(uint256,uint256)": EventFragment;
    "Withdraw(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export type DepositEvent = TypedEvent<
  [BigNumber, BigNumber] & {
    collateralETHDeposited: BigNumber;
    amountUSDMinted: BigNumber;
  }
>;

export type WithdrawEvent = TypedEvent<
  [BigNumber, BigNumber] & {
    collateralETHWithdraw: BigNumber;
    amountUSDBurned: BigNumber;
  }
>;

export class ILender extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ILenderInterface;

  functions: {
    deposit(
      amountToDeposit: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    estimateCollateralAmount(
      repaymentAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { collateralAmount: BigNumber }>;

    estimateTokenAmount(
      depositAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { tokenAmount: BigNumber }>;

    getLender(
      userAddress: string,
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber, BigNumber] & {
          collateralETH: BigNumber;
          debtAmount: BigNumber;
        }
      ] & {
        lender: [BigNumber, BigNumber] & {
          collateralETH: BigNumber;
          debtAmount: BigNumber;
        };
      }
    >;

    withdraw(
      repaymentAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  deposit(
    amountToDeposit: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  estimateCollateralAmount(
    repaymentAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  estimateTokenAmount(
    depositAmount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getLender(
    userAddress: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { collateralETH: BigNumber; debtAmount: BigNumber }
  >;

  withdraw(
    repaymentAmount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deposit(
      amountToDeposit: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    estimateCollateralAmount(
      repaymentAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    estimateTokenAmount(
      depositAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLender(
      userAddress: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        collateralETH: BigNumber;
        debtAmount: BigNumber;
      }
    >;

    withdraw(
      repaymentAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Deposit(uint256,uint256)"(
      collateralETHDeposited?: null,
      amountUSDMinted?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { collateralETHDeposited: BigNumber; amountUSDMinted: BigNumber }
    >;

    Deposit(
      collateralETHDeposited?: null,
      amountUSDMinted?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { collateralETHDeposited: BigNumber; amountUSDMinted: BigNumber }
    >;

    "Withdraw(uint256,uint256)"(
      collateralETHWithdraw?: null,
      amountUSDBurned?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { collateralETHWithdraw: BigNumber; amountUSDBurned: BigNumber }
    >;

    Withdraw(
      collateralETHWithdraw?: null,
      amountUSDBurned?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { collateralETHWithdraw: BigNumber; amountUSDBurned: BigNumber }
    >;
  };

  estimateGas: {
    deposit(
      amountToDeposit: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    estimateCollateralAmount(
      repaymentAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    estimateTokenAmount(
      depositAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLender(
      userAddress: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      repaymentAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deposit(
      amountToDeposit: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    estimateCollateralAmount(
      repaymentAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    estimateTokenAmount(
      depositAmount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLender(
      userAddress: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      repaymentAmount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ILender.sol";
import "./implementations/StableCoin.sol";
import "./PriceConverter.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
// oracle pricing

error IncorrectETHAmount();
error WithdrawLimitExceeded();
error InadequeteTokenBalance();

contract Lender is ILender, Ownable {
    mapping(address => LenderEntity) lenders;
    StableCoin public token;

    AggregatorV3Interface public priceFeed;

    constructor(StableCoin _token, address priceFeedAddress) {
        token = _token;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
        // oracle = _oracle
    }

    /**
     @notice Let's user to deposit ETH collateral in exchange for stablecoin
     @param amountToDeposit Ether sent to the contract by the user
     */
    function deposit(uint256 amountToDeposit) external payable override {
        if (amountToDeposit != msg.value) {
            revert IncorrectETHAmount();
        }
        uint256 amountToMint = PriceConverter.getConversionRate(
            msg.value,
            priceFeed
        );
        token.mint(msg.sender, amountToMint);
        lenders[msg.sender].collateralETH += amountToDeposit;
        lenders[msg.sender].debtAmount += amountToMint;
        emit Deposit(amountToDeposit, amountToMint / 10**18);
    }

    /**
     @notice Let's users withdraw collateral intially submitted
     @param repaymentAmount The amount the user is paying back to the contract to redeem collateral
     */
    function withdraw(uint256 repaymentAmount) external override {
        if (repaymentAmount > lenders[msg.sender].debtAmount) {
            revert WithdrawLimitExceeded();
        }
        if (token.balanceOf(msg.sender) < repaymentAmount) {
            revert InadequeteTokenBalance();
        }
        uint256 amountToWithdraw = (repaymentAmount * 10**18) /
            PriceConverter.getConversionRate(10**18, priceFeed);
        token.burn(msg.sender, repaymentAmount);
        lenders[msg.sender].collateralETH -= amountToWithdraw;
        lenders[msg.sender].debtAmount -= repaymentAmount;
        payable(msg.sender).transfer(amountToWithdraw);
        emit Withdraw(amountToWithdraw, repaymentAmount);
    }

    /**
     @notice gets details of each lender
     @param userAddress fetches details of this address
     @return lender returns the lender's values
     */
    function getLender(address userAddress)
        external
        view
        override
        returns (LenderEntity memory lender)
    {
        return lenders[userAddress];
    }

    /**
    @notice Returns an estimate of how much collateral could be withdrawn for a given amount of stablecoin
    @param repaymentAmount  the amount of stable coin that would be repaid
    @return collateralAmount the estimated amount of a vault's collateral that would be returned 
     */
    function estimateCollateralAmount(uint256 repaymentAmount)
        external
        view
        override
        returns (uint256 collateralAmount)
    {
        return
            repaymentAmount /
            PriceConverter.getConversionRate(10**18, priceFeed);
    }

    /**
    @notice Returns an estimate on how much stable coin could be minted at the current rate
    @param depositAmount the amount of ETH that would be deposited
    @return tokenAmount  the estimated amount of stablecoin that would be minted
     */
    function estimateTokenAmount(uint256 depositAmount)
        external
        view
        override
        returns (uint256 tokenAmount)
    {
        return depositAmount * getEthUSDPrice();
    }

    function getEthUSDPrice() public view returns (uint256) {
        uint256 price18 = PriceConverter.getConversionRate(10**18, priceFeed);
        return price18;
    }

    function getToken() external view returns (address) {
        return address(token);
    }

    receive() external payable {}

    fallback() external payable {}
}

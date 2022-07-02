//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

interface ILender {
    struct LenderEntity {
        uint256 collateralETH;
        uint256 debtAmount;
    }

    event Deposit(uint256 collateralETHDeposited, uint256 amountUSDMinted);
    event Withdraw(uint256 collateralETHWithdraw, uint256 amountUSDBurned);

    /**
    @notice Allows a user to deposit ETH collateral in exchange for some amount of stablecoin
    @param amountToDeposit  The amount of ether the user sent in the transaction
     */
    function deposit(uint256 amountToDeposit) external payable;

    /**
    @notice Allows a user to withdraw up to 100% of the collateral they have on deposit
    @dev This cannot allow a user to withdraw more than they put in
    @param repaymentAmount  the amount of stablecoin that a user is repaying to redeem their collateral for.
     */
    function withdraw(uint256 repaymentAmount) external;

    /**
    @notice Returns the details of a vault
    @param userAddress  the address of the vault owner
    @return lender the vault details
     */
    function getLender(address userAddress)
        external
        view
        returns (LenderEntity memory lender);

    /**
    @notice Returns an estimate of how much collateral could be withdrawn for a given amount of stablecoin
    @param repaymentAmount  the amount of stable coin that would be repaid
    @return collateralAmount the estimated amount of a vault's collateral that would be returned 
     */
    function estimateCollateralAmount(uint256 repaymentAmount)
        external
        view
        returns (uint256 collateralAmount);

    /**
    @notice Returns an estimate on how much stable coin could be minted at the current rate
    @param depositAmount the amount of ETH that would be deposited
    @return tokenAmount  the estimated amount of stablecoin that would be minted
     */
    function estimateTokenAmount(uint256 depositAmount)
        external
        view
        returns (uint256 tokenAmount);
}

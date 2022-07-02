// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IStableCoin.sol";

contract StableCoin is ERC20, IStableCoin, Ownable {
    constructor() ERC20("YangitUSD", "YUSD") {}

    function mint(address account, uint256 amount)
        external
        override
        onlyOwner
        returns (bool)
    {
        _mint(account, amount);
        return true;
    }

    function burn(address account, uint256 amount)
        external
        override
        onlyOwner
        returns (bool)
    {
        _burn(account, amount);
        return true;
    }
}

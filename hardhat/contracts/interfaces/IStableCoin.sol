// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

interface IStableCoin {
    function mint(address account, uint256 amount) external returns (bool);

    function burn(address account, uint256 amount) external returns (bool);
}

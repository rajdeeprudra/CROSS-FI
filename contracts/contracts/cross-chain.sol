// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CrossChain {
    event CrossChainBorrow(
        address user,
        string fromChain,
        string toChain,
        uint256 amount
    );

    function crossChainBorrow(
        string memory from,
        string memory to,
        uint256 amount
    ) external {
        emit CrossChainBorrow(msg.sender, from, to, amount);
    }
}
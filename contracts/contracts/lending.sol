// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Lending {
    struct Position {
        uint256 collateral;
        uint256 debt;
    }

    mapping(address => Position) public positions;

    uint256 public collateralFactor = 75; // 75%

    function deposit(uint256 amount) external {
        positions[msg.sender].collateral += amount;
    }

    function borrow(uint256 amount) external {
        Position storage p = positions[msg.sender];

        uint256 maxBorrow = (p.collateral * collateralFactor) / 100;

        require(p.debt + amount <= maxBorrow, "Exceeds borrow limit");

        p.debt += amount;
    }

    function repay(uint256 amount) external {
        Position storage p = positions[msg.sender];

        require(p.debt >= amount, "Too much repay");

        p.debt -= amount;
    }

    function healthFactor(address user) public view returns (uint256) {
        Position memory p = positions[user];

        if (p.debt == 0) return type(uint256).max;

        return (p.collateral * collateralFactor) / p.debt;
    }
}
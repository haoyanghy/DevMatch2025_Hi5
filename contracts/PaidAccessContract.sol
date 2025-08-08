/*
This is a Sapphire smart contrat that stores confidential transaction information.
*/

// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

// The contract accept payment, store addresses, and check if a user has paid
contract PaidAccess{
    // Price to be paid for 10 prompts
    uint256 public price = 0.0001 ether;

    // public var to be verified by other systems
    mapping(address => bool) public hasPaid;
    
    event AccessAllowed(address indexed user);

    function acceptPayment() external payable{
        require(msg.value == price, "Please transfer the exact amount of ETH");
        require(!hasPaid[msg.sender], "User has paid");
        hasPaid[msg.sender] = true;
        emit AccessAllowed(msg.sender);
    }

    // Check if a user has paid
    function checkPayment(address user) public view returns (bool){
        return hasPaid[user];
    }
} 

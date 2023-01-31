// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.8;
import "hardhat/console.sol";

contract Token {
    string public name = "jonathanmv Token";
    string public symbol = "JMV";

    uint256 public totalSupply = 1000000;

    address public owner;

    mapping(address => uint256) balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    /**
     * Transfers tokens from a source address to a destination address
     * @param to source address
     * @param amount destination address
     */
    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");

        console.log(
            "Transferring %s tokens from %s to %s",
            amount,
            msg.sender,
            to
        );

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
    }

    /**
     * Gets the balance of the address
     * @param account address to view the balance from
     */
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}

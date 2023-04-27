// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccountInfo {
    struct User {
        string name;
        address accountAddress;
        string description;
        bool exists;
    }

    mapping(address => User) private users;

    function createUser(string memory _name, string memory _description) public {
        require(users[msg.sender].accountAddress == address(0), "User already exists");
        users[msg.sender] = User(_name, msg.sender, _description, true);
    }

    function getUser() public view returns (string memory, address, string memory, bool) {
        require(users[msg.sender].exists, "User does not exist");
        return (users[msg.sender].name, users[msg.sender].accountAddress, users[msg.sender].description, true);
    }

    function userExists(address userAddress) public view returns (bool) {
        return users[userAddress].exists;
    }
}

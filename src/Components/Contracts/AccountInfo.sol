// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccountInfo {
    struct User {
        string name;
        address accountAddress;
        string description;
        string profilePic; // Added variable for profile picture
        bool exists;
    }

    mapping(address => User) private users;

    function createUser(string memory _name, string memory _description, string memory _profilePic) public {
        require(users[msg.sender].accountAddress == address(0), "User already exists");
        users[msg.sender] = User(_name, msg.sender, _description, _profilePic, true);
    }

    function getUser(address userAddress) public view returns (string memory, address, string memory, string memory, bool) {
        require(users[userAddress].exists, "User does not exist");
        return (users[userAddress].name, users[userAddress].accountAddress, users[userAddress].description, users[userAddress].profilePic, true);
    }


    function userExists(address userAddress) public view returns (bool) {
        return users[userAddress].exists;
    }
}

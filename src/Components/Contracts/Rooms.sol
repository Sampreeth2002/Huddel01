// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Room {
    struct RoomStruct {
        string name;
        string description;
        bool isActive;
        string roomId;
        address creator;
        string thumbnail;
    }

    struct Recording {
        address creator;
        string videoLink;
    }

    uint256 public noOfRooms;
    uint256 public noOfRecordings;
    mapping(uint256 => RoomStruct) public allRooms;
    mapping(uint256 => Recording) public recordings;

    event RoomCreated(uint256 roomId, string name, address creator,string thumbnail);
    event RoomActiveChanged(uint256 roomId, bool isActive);

    function createRoom(string memory name, string memory roomId,string memory description,string memory thumbnail) public {
        bool roomExists = false;
        for (uint256 i = 0; i < noOfRooms; i++) {
            if (allRooms[i].creator == msg.sender && allRooms[i].isActive) {
                allRooms[i].isActive = false;
                roomExists = true;
                emit RoomActiveChanged(i, false);
                break;
            }
        }
        allRooms[noOfRooms] = RoomStruct(name, description, true, roomId, msg.sender,thumbnail);
        emit RoomCreated(noOfRooms, name, msg.sender,thumbnail);
        noOfRooms++;
    }

    function getRoom(uint256 roomId) public view returns (string memory,string memory, bool, string memory, address,string memory) {
        RoomStruct memory room = allRooms[roomId];
        return (room.name, room.description ,room.isActive, room.roomId, room.creator,room.thumbnail);
    }

    function setRoomInactive(uint256 roomId, bool active) public {
        allRooms[roomId].isActive = active;
        emit RoomActiveChanged(roomId, active);
    }

    function getActiveRooms() public view returns (uint256[] memory) {
        uint256[] memory activeRoomIds = new uint256[](noOfRooms);
        uint256 activeRoomCount = 0;
        for (uint256 i = 0; i < noOfRooms; i++) {
            if (allRooms[i].isActive) {
                activeRoomIds[activeRoomCount] = i;
                activeRoomCount++;
            }
        }
        uint256[] memory result = new uint256[](activeRoomCount);
        for (uint256 i = 0; i < activeRoomCount; i++) {
            result[i] = activeRoomIds[i];
        }
        return result;
    }

    function createPrivateRoom(string memory name, string memory description,string memory roomId, string memory thumbnail, address guest) public {
        require(guest != address(0), "Invalid guest address");
        bool roomExists = false;
        for (uint256 i = 0; i < noOfRooms; i++) {
            if (allRooms[i].creator == msg.sender && allRooms[i].isActive) {
                allRooms[i].isActive = false;
                roomExists = true;
                emit RoomActiveChanged(i, false);
                break;
            }
        }
        
        allRooms[noOfRooms] = RoomStruct(name,description, true, roomId, msg.sender, thumbnail);
        emit RoomCreated(noOfRooms, name, msg.sender, thumbnail);
        noOfRooms += 1;
    }

     function createRecordings(string memory videoLink) public {
        recordings[noOfRecordings] = Recording(msg.sender, videoLink);
        noOfRecordings+=1;
    }

    function getAllRecordings() public view returns (Recording[] memory) {
        Recording[] memory allRecordings = new Recording[](noOfRecordings);
        for (uint256 i = 0; i < noOfRecordings; i++) {
            allRecordings[i] = recordings[i];
        }
        return allRecordings;
    }



}

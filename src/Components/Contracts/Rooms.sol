// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Room {
    struct RoomStruct {
        string name;
        bool isActive;
        string roomId;
        address creator;
    }

    uint256 public noOfRooms;
    mapping(uint256 => RoomStruct) public allRooms;

    event RoomCreated(uint256 roomId, string name, address creator);
    event RoomActiveChanged(uint256 roomId, bool isActive);

    function createRoom(string memory name, string memory roomId) public {
        bool roomExists = false;
        for (uint256 i = 0; i < noOfRooms; i++) {
            if (allRooms[i].creator == msg.sender && allRooms[i].isActive) {
                allRooms[i].isActive = false;
                roomExists = true;
                emit RoomActiveChanged(i, false);
                break;
            }
        }
        allRooms[noOfRooms] = RoomStruct(name, true, roomId, msg.sender);
        emit RoomCreated(noOfRooms, name, msg.sender);
        noOfRooms++;
    }

    function getRoom(uint256 roomId) public view returns (string memory, bool, string memory, address) {
        RoomStruct memory room = allRooms[roomId];
        return (room.name, room.isActive, room.roomId, room.creator);
    }

    function setRoomActive(uint256 roomId, bool active) public {
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
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract Whisper {

    mapping(address => string[]) private whispers;

    event WhisperSubmitted(address indexed userAddress, string whisperHash);

    function getLatestWhisper(address _userAddress) public view returns (string memory) {
        require(whispers[_userAddress].length > 0, "This user has no whispers.");
        return whispers[_userAddress][whispers[_userAddress].length - 1];
    }

    function addWhisper(string memory whisperHash) external {
        whispers[msg.sender].push(whisperHash);
        emit WhisperSubmitted(msg.sender, whisperHash);
    }
}
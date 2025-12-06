// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";

/// @title Private Access Control
/// @notice Demonstrates how to grant decryption permissions to other users.
contract AccessControl {
    euint32 private secureData;
    address public owner;

    constructor() {
        owner = msg.sender;
        secureData = TFHE.asEuint32(1337); // Secret number
        TFHE.allow(secureData, address(this));
        TFHE.allow(secureData, owner);
    }

    /// @notice Grants a specific user permission to view the secret data
    /// @dev Uses TFHE.allow() to update the ACL (Access Control List) on-chain
    /// @param _user The address to grant access to
    function grantAccess(address _user) public {
        require(msg.sender == owner, "Only owner can grant access");
        TFHE.allow(secureData, _user);
    }

    /// @notice Returns the secret data
    /// @dev This will REVERT during decryption if the caller is not allowed via TFHE.allow()
    function getSecureData() public view returns (euint32) {
        return secureData;
    }
}
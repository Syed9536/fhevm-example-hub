// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";

/// @title Encrypted Counter
/// @notice This contract demonstrates a simple counter using Homomorphic Encryption.
/// @dev Users can add encrypted amounts without revealing the value to the public or the blockchain.
contract EncryptedCounter {
    euint32 private counter;

    /// @notice Initializes the counter to 0 (encrypted)
    constructor() {
        counter = TFHE.asEuint32(0);
        TFHE.allow(counter, address(this));
        TFHE.allow(counter, msg.sender);
    }

    /// @notice Adds an encrypted amount to the counter
    /// @param _encryptedAmount The encrypted value to add (euint32)
    /// @param _inputProof The proof verifying the input validity
    function add(einput _encryptedAmount, bytes calldata _inputProof) public {
        euint32 amount = TFHE.asEuint32(_encryptedAmount, _inputProof);
        counter = TFHE.add(counter, amount);
        TFHE.allow(counter, address(this));
        TFHE.allow(counter, msg.sender);
    }

    /// @notice Returns the current encrypted counter value
    /// @dev Only authorized users (who have been allowed) can decrypt this result
    /// @return The current counter state as an encrypted uint32
    function getCounter() public view returns (euint32) {
        return counter;
    }
}
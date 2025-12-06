// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";

contract EncryptedCounter {
    euint32 private counter;

    constructor() {
        counter = TFHE.asEuint32(0);
        TFHE.allow(counter, address(this));
        TFHE.allow(counter, msg.sender);
    }

    function add(einput _encryptedAmount, bytes calldata _inputProof) public {
        euint32 amount = TFHE.asEuint32(_encryptedAmount, _inputProof);
        counter = TFHE.add(counter, amount);
        TFHE.allow(counter, address(this));
        TFHE.allow(counter, msg.sender);
    }

    function getCounter() public view returns (euint32) {
        return counter;
    }
}
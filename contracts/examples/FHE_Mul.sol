// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;
import "fhevm/lib/TFHE.sol";
contract FHE_Mul {
    function mul(einput _a, bytes calldata _proofA, einput _b, bytes calldata _proofB) public {
        euint32 a = TFHE.asEuint32(_a, _proofA);
        euint32 b = TFHE.asEuint32(_b, _proofB);
        euint32 result = TFHE.mul(a, b);
        TFHE.allow(result, msg.sender);
    }
}
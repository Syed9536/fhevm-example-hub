// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";

contract FHE_Div {
    // ⚠️ Note: FHEVM currently only supports division by a SCALAR (unencrypted number).
    
    // 👇 Yahan se 'view' hata diya gaya hai
    function div(euint32 a, uint32 b) public returns (euint32) {
        euint32 result = TFHE.div(a, b);
        return result;
    }
}
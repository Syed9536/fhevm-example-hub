// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;

import "fhevm/lib/TFHE.sol";

contract FHE_Rem {
    // ⚠️ Note: Remainder only works with a SCALAR (unencrypted) divisor.
    
    // 👇 Yahan se bhi 'view' hata diya gaya hai
    function rem(euint32 a, uint32 b) public returns (euint32) {
        euint32 result = TFHE.rem(a, b);
        return result;
    }
}
# FHE_Mux

This example demonstrates the **FHE_Mux** operation using Zama's FHEVM.

## 📄 Smart Contract Code

```solidity
// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;
import "@fhevm/solidity/lib/TFHE.sol";
contract FHE_Mux {
    function mux(einput _controlBit, bytes calldata _proofBit, einput _a, bytes calldata _proofA, einput _b, bytes calldata _proofB) public {
        ebool control = TFHE.asEbool(_controlBit, _proofBit);
        euint32 a = TFHE.asEuint32(_a, _proofA);
        euint32 b = TFHE.asEuint32(_b, _proofB);
        euint32 result = TFHE.select(control, a, b);
        TFHE.allow(result, msg.sender);
    }
}
```

## 🚀 How to Run

1. **Compile**
   ```bash
   npx hardhat compile
   ```

2. **Test**
   ```bash
   npx hardhat test
   ```

# FHE_Gt

This example demonstrates the **FHE_Gt** operation using Zama's FHEVM.

## 📄 Smart Contract Code

```solidity
// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;
import "@fhevm/solidity/lib/TFHE.sol";
contract FHE_Gt {
    function checkGt(einput _a, bytes calldata _proofA, einput _b, bytes calldata _proofB) public {
        euint32 a = TFHE.asEuint32(_a, _proofA);
        euint32 b = TFHE.asEuint32(_b, _proofB);
        ebool result = TFHE.gt(a, b);
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

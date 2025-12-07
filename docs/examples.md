# 📚 Examples Library

Explore our collection of **15+ FHEVM Examples** showcasing specific encrypted operations using the latest Zama API.

---

## 🧮 Arithmetic Operations

### [➕ Encrypted Addition (FHE_Add)](https://github.com/Syed9536/fhevm-example-hub/blob/main/contracts/examples/FHE_Add.sol)
Adds two encrypted 32-bit integers (`euint32`).
```solidity
euint32 result = TFHE.add(a, b);
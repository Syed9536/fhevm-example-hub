# FHEVM Example Hub 🛡️

A comprehensive CLI tool to scaffold fully functional FHEVM (Fully Homomorphic Encryption) applications on Zama.

**Bounty Submission for December 2025**

## 🚀 Features
- **Automated Scaffolding:** Sets up a clean Hardhat environment instantly.
- **Auto-Documentation:** Generates README.md from Solidity code annotations.
- **Smart Template System:** Includes pre-built logic for various use cases.

## 📦 Available Templates
- **EncryptedCounter:** Basic encryption & arithmetic.
- **BlindAuction:** Advanced logic (Highest bidder remains hidden).
- **ConfidentialToken:** Compliant ERC-20 with encrypted balances.
- **Access Control:** Data permission management.

## 🛠️ Usage

### 1. Installation
```bash
git clone https://github.com/Syed9536/fhevm-example-hub.git
cd fhevm-example-hub
npm install
```

### 2. Generate a Project
```bash
npx ts-node scripts/create-fhevm-example.ts my-app
```

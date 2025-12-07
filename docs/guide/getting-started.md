# 🚀 FHEVM Example Hub: Getting Started

Welcome to the FHEVM Example Hub. Use this guide to deploy and test confidential smart contracts on the Zama Devnet.

## Prerequisites

- **Node.js** (v20 or higher)
- **Git**
- **Metamask** Wallet (required for deployment)



## 📦 Installation

1. Clone the repository:

```bash
git clone [https://github.com/Syed9536/fhevm-example-hub.git](https://github.com/Syed9536/fhevm-example-hub.git)
cd fhevm-example-hub
npm install
```

---

## 🌐 Connect to Zama Devnet (Public Testnet)
```
Instead of running a local node, you can deploy your confidential contracts directly to Zama's public devnet.
```

---



**1. Configure Metamask**

Add the following network details to your wallet:

| Setting | Value |
| :--- | :--- |
| **Network Name** | Zama Devnet |
| **RPC URL** | `https://devnet.zama.ai` |
| **Chain ID** | `8009` |
| **Currency Symbol** | `ZAMA` |
| **Block Explorer** | [https://main.explorer.zama.ai](https://main.explorer.zama.ai) |


---

## 🚰 Get Test Funds (Faucet)

You need free ZAMA tokens to pay for gas fees.

1. Go to the **[Zama Faucet](https://faucet.zama.ai)**.
2. Paste your wallet address.
3. Click "Request". You will receive test tokens instantly.

---

## 🚀 Deploying Templates

```bash
When running the deployment scripts, make sure to point them to the public network.
```
---

# Example

```bash
npx hardhat run scripts/deploy.ts --network zama
```
---
# 💰 Confidential ERC-20 Token

This template implements a standard ERC-20 token but with fully encrypted balances and transfers.

## 🔥 Why use this?
- **Hidden Balances:** Nobody can see how many tokens a user holds on-chain.
- **Private Transfers:** Transaction amounts are encrypted; only the sender and receiver know the value.
- **DeFi Standard:** The foundation for building private DEXs or Lending protocols.

## 💻 How to Generate

Run this command in your terminal:

```bash
npx ts-node scripts/create-fhevm-example.ts my-token --template ConfidentialToken
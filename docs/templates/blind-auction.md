# 🔨 Blind Auction Template

This template implements a sealed-bid auction system where the highest bid is tracked securely without revealing any amounts.

## 🔥 Why use this?
- **Privacy:** Bidders don't know the current highest bid.
- **Fairness:** Eliminates bid sniping and front-running.
- **Efficiency:** Computation happens on-chain using FHE.

## 💻 How to Generate

Run this command in your terminal:

```bash
npx ts-node scripts/create-fhevm-example.ts my-auction --template BlindAuction
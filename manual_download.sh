#!/bin/bash

# 1. Create directory manually
echo "📂 Creating directory structure..."
mkdir -p node_modules/@fhevm/solidity/lib

# 2. Download TFHE.sol directly from Zama's GitHub (Raw)
# Hum v0.5.x ka stable version utha rahe hain
echo "⬇️ Downloading TFHE.sol from GitHub..."
curl -L https://raw.githubusercontent.com/zama-ai/fhevm/v0.5.14/lib/TFHE.sol -o node_modules/@fhevm/solidity/lib/TFHE.sol

# 3. Verify
if [ -f "node_modules/@fhevm/solidity/lib/TFHE.sol" ]; then
    echo "✅ Success! File downloaded manually."
    echo "Path: node_modules/@fhevm/solidity/lib/TFHE.sol"
    
    # 4. Update Contracts imports
    echo "📝 Updating imports in contracts..."
    cd contracts/examples
    # Point to the new manual path
    sed -i '' 's|import ".*TFHE.sol";|import "@fhevm/solidity/lib/TFHE.sol";|g' *.sol
    cd ../..
    
    echo "🚀 Trying to Compile..."
    npx hardhat compile
else
    echo "❌ Download Failed. Internet check karo."
fi

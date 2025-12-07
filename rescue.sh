#!/bin/bash

echo "🔧 Fixing Hardhat Config Syntax..."
# 1. Rewrite hardhat.config.cjs with correct CJS syntax
cat > hardhat.config.cjs << 'CONFIG'
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@fhevm/hardhat-plugin");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
      evmVersion: "cancun",
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    zama: {
      url: "https://devnet.zama.ai",
      chainId: 8009,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : undefined,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
CONFIG

echo "⬇️  Force Installing Dependencies..."
# 2. Install dependencies ignoring conflicts
npm install --legacy-peer-deps
npm install @fhevm/solidity@latest --save-dev --legacy-peer-deps

echo "🕵️‍♂️ Hunting for TFHE.sol..."
# 3. Find TFHE.sol file
FOUND_PATH=$(find node_modules -name "TFHE.sol" | head -n 1)

if [ -z "$FOUND_PATH" ]; then
    echo "❌ ERROR: TFHE.sol abhi bhi nahi mili. Internet check karo."
    exit 1
else
    echo "✅ File Found at: $FOUND_PATH"
fi

# 4. Extract Import Path
# Removes 'node_modules/' from the start
IMPORT_PATH=${FOUND_PATH#"node_modules/"}
echo "🛠️  Setting Import Path to: $IMPORT_PATH"

echo "📝 Updating Contract Imports..."
# 5. Update all contracts
cd contracts/examples
# Compatible sed command for replacing imports
sed -i '' "s|import \".*TFHE.sol\";|import \"$IMPORT_PATH\";|g" *.sol
cd ../..

echo "🚀 Compiling..."
npx hardhat compile

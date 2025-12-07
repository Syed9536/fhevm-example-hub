#!/bin/bash

echo "🗑️  Cleaning corrupt packages..."
rm -rf node_modules/@fhevm
rm -rf node_modules/.cache

# FIX: Using 'latest' instead of a hardcoded number
echo "⬇️  Installing @fhevm/solidity (Latest Stable)..."
npm install @fhevm/solidity@latest --save-dev

echo "🔍 Hunting for TFHE.sol..."
# Find the file anywhere inside node_modules/@fhevm
FOUND_PATH=$(find node_modules/@fhevm -name "TFHE.sol" | head -n 1)

if [ -z "$FOUND_PATH" ]; then
    echo "❌ CRITICAL ERROR: File download failed completely."
    echo "👉 Please check your internet connection and try running: npm install"
    exit 1
else
    echo "✅ File Found at: $FOUND_PATH"
fi

# Clean path for import (remove node_modules/)
IMPORT_PATH=${FOUND_PATH#"node_modules/"}
echo "🛠️  Setting Import Path to: $IMPORT_PATH"

# Update all .sol files in contracts/examples
echo "📝 Updating 15 Contract Files..."
cd contracts/examples
# Mac-compatible sed command to replace imports
sed -i '' "s|import \".*TFHE.sol\";|import \"$IMPORT_PATH\";|g" *.sol
cd ../..

echo "🚀 DONE! Now attempting to compile..."
npx hardhat compile

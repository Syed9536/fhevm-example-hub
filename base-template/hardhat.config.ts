const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// --- Plugins must be required here ---
require("@fhevm/hardhat-plugin");
require("hardhat-deploy"); // 👈 HHE404 FIX
require("@nomicfoundation/hardhat-ethers"); // Hardhat Ethers ke liye
require("hardhat-gas-reporter");
require("solidity-coverage");

// Remove @nomicfoundation/hardhat-toolbox to prevent plugin conflicts

const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    // ZAMA DEVNET (Target Network for Bounty Submission)
    zama: {
      url: "https://devnet.zama.ai", 
      chainId: 8009, 
      // Accounts are loaded only if PRIVATE_KEY exists in .env
      ...(PRIVATE_KEY ? { accounts: [PRIVATE_KEY] } : {}),
    },
    // Optional: Keep Sepolia
    sepolia: {
      chainId: 11155111,
      url: `https://rpc.ankr.com/eth_sepolia`,
      ...(PRIVATE_KEY ? { accounts: [PRIVATE_KEY] } : {}),
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
      evmVersion: "cancun",
    },
  },
  // Ensure the file is treated as a CJS module (if file is named .js)
  // If file is named hardhat.config.ts, this is ignored.
  // The crucial part is we replaced `export default config` with `module.exports = config`.
};
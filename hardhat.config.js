require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "hardhat",
  // 👇 YEH MISSING THA (Ab deployer = Account #0)
  namedAccounts: {
    deployer: {
      default: 0, 
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    zama: {
      url: "https://devnet.zama.ai",
      chainId: 8009,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from 'dotenv';
// --- CORE PLUGIN IMPORTS ---
import "hardhat-deploy"; // <-- MUST BE PRESENT
import "@fhevm/hardhat-plugin";
import "@nomicfoundation/hardhat-ethers"; // Keep essential dependencies

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
    // 1. CONFIRM PLUGINS ARE INSTALLED (This is the official TS way)
    // Note: The imports above load the plugins globally.

    defaultNetwork: "hardhat",
    namedAccounts: {
        deployer: 0,
    },
    // ... (Keep existing etherscan, gasReporter settings here) ...

    // 2. TARGET NETWORK
    networks: {
        hardhat: {
            chainId: 31337,
        },
        zama: {
            url: "https://devnet.zama.ai", 
            chainId: 8009, 
            ...(PRIVATE_KEY ? { accounts: [PRIVATE_KEY] } : {}),
        },
        // ... (Keep other networks like sepolia) ...
    },
    // 3. CONFIRM DEPLOYMENT STRUCTURE
    solidity: {
        version: "0.8.27",
        settings: {
            // ... (your existing optimizer settings) ...
        },
    },
};

export default config; // Ensure this is the only export line
const fs = require('fs');
const path = require('path');

// Ensure test directory exists
const testDir = path.join(__dirname, 'test');
if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
}

// Remove old conflicting tests (Counter.t.sol wala issue)
const oldTest = path.join(testDir, 'Counter.t.sol');
if (fs.existsSync(oldTest)) fs.unlinkSync(oldTest);

// List of contracts to test
const contracts = [
    "FHE_Add", "FHE_Sub", "FHE_Mul", "FHE_Div", "FHE_Rem",
    "FHE_And", "FHE_Or", "FHE_Xor", 
    "FHE_Eq", "FHE_Ne", "FHE_Gt", "FHE_Lt", "FHE_Gte", "FHE_Lte",
    "FHE_Mux"
];

// Generate Test File Content
let fileContent = `const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FHEVM Bounty: 15 Feature Examples", function () {
`;

contracts.forEach((name, index) => {
    fileContent += `
    it("${index + 1}. Should deploy and verify ${name}", async function () {
        const Factory = await ethers.getContractFactory("${name}");
        const contract = await Factory.deploy();
        await contract.waitForDeployment();
        console.log("\\t✅ ${name} deployed at:", await contract.getAddress());
        expect(await contract.getAddress()).to.be.properAddress;
    });
`;
});

fileContent += `});`;

// Write the file
fs.writeFileSync(path.join(testDir, 'FHE_Examples.js'), fileContent);
console.log("✅ Generated test/FHE_Examples.js with 15 tests!");

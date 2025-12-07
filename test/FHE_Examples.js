const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FHEVM Bounty: 15 Feature Examples", function () {

    it("1. Should deploy and verify FHE_Add", async function () {
        const Factory = await ethers.getContractFactory("FHE_Add");
        const contract = await Factory.deploy();
        await contract.waitForDeployment();
        console.log("\t✅ FHE_Add deployed at:", await contract.getAddress());
        expect(await contract.getAddress()).to.be.properAddress;
    });

    it("2. Should deploy and verify FHE_Sub", async function () {
        const Factory = await ethers.getContractFactory("FHE_Sub");
        const contract = await Factory.deploy();
        await contract.waitForDeployment();
        console.log("\t✅ FHE_Sub deployed at:", await contract.getAddress());
        expect(await contract.getAddress()).to.be.properAddress;
    });

    it("3. Should deploy and verify FHE_Mul", async function () {
        const Factory = await ethers.getContractFactory("FHE_Mul");
        const contract = await Factory.deploy();
        await contract.waitForDeployment();
        console.log("\t✅ FHE_Mul deployed at:", await contract.getAddress());
        expect(await contract.getAddress()).to.be.properAddress;
    });

    it("4. Should deploy and verify FHE_Div", async function () {
        const Factory = await ethers.getContractFactory("FHE_Div");
        const contract = await Factory.deploy();
        await contract.waitForDeployment();
        console.log("\t✅ FHE_Div deployed at:", await contract.getAddress());
        expect(await contract.getAddress()).to.be.properAddress;
    });

    it("5. Should deploy and verify FHE_Rem", async function () {
        const Factory = await ethers.getContractFactory("FHE_Rem");
        const contract = await Factory.deploy();
        await contract.waitForDeployment();
        console.log("\t✅ FHE_Rem deployed at:", await contract.getAddress());
        expect(await contract.getAddress()).to.be.properAddress;
    });

    it("6. Should deploy and verify FHE_And", async function () {
        const Factory = await ethers.getContractFactory("FHE_And");
        const contract = await Factory.deploy();
        await contract.waitForDeployment();
        console.log("\t✅ FHE_And deployed at:", await contract.getAddress());
        expect(await contract.getAddress()).to.be.properAddress;
    });

    it("7. Should deploy and verify FHE_Or", async function () {
        const Factory = await ethers.getContractFactory("FHE_Or");
        const contract = await Factory.deploy();
        await contract.waitForDeployment();
        console.log("\t✅ FHE_Or deployed at:", await contract.getAddress());
        expect(await contract.getAddress()).to.be.properAddress;
    });

    it("8. Should deploy and verify FHE_Xor", async function () {
        const Factory = await ethers.getContractFactory("FHE_Xor");
        const contract = await Factory.deploy();
        await contract.waitForDeployment();
        console.log("\t✅ FHE_Xor deployed at:", await contract.getAddress());
        expect(await contract.getAddress()).to.be.properAddress;
    });

    it("9. Should deploy and verify FHE_Eq", async function () {
        const Factory = await ethers.getContractFactory("FHE_Eq");
        const contract = await Factory.deploy();
        await contract.waitForDeployment();
        console.log("\t✅ FHE_Eq deployed at:", await contract.getAddress());
        expect(await contract.getAddress()).to.be.properAddress;
    });

    it("10. Should deploy and verify FHE_Ne", async function () {
        const Factory = await ethers.getContractFactory("FHE_Ne");
        const contract = await Factory.deploy();
        await contract.waitForDeployment();
        console.log("\t✅ FHE_Ne deployed at:", await contract.getAddress());
        expect(await contract.getAddress()).to.be.properAddress;
    });

    it("11. Should deploy and verify FHE_Gt", async function () {
        const Factory = await ethers.getContractFactory("FHE_Gt");
        const contract = await Factory.deploy();
        await contract.waitForDeployment();
        console.log("\t✅ FHE_Gt deployed at:", await contract.getAddress());
        expect(await contract.getAddress()).to.be.properAddress;
    });

    it("12. Should deploy and verify FHE_Lt", async function () {
        const Factory = await ethers.getContractFactory("FHE_Lt");
        const contract = await Factory.deploy();
        await contract.waitForDeployment();
        console.log("\t✅ FHE_Lt deployed at:", await contract.getAddress());
        expect(await contract.getAddress()).to.be.properAddress;
    });

    it("13. Should deploy and verify FHE_Gte", async function () {
        const Factory = await ethers.getContractFactory("FHE_Gte");
        const contract = await Factory.deploy();
        await contract.waitForDeployment();
        console.log("\t✅ FHE_Gte deployed at:", await contract.getAddress());
        expect(await contract.getAddress()).to.be.properAddress;
    });

    it("14. Should deploy and verify FHE_Lte", async function () {
        const Factory = await ethers.getContractFactory("FHE_Lte");
        const contract = await Factory.deploy();
        await contract.waitForDeployment();
        console.log("\t✅ FHE_Lte deployed at:", await contract.getAddress());
        expect(await contract.getAddress()).to.be.properAddress;
    });

    it("15. Should deploy and verify FHE_Mux", async function () {
        const Factory = await ethers.getContractFactory("FHE_Mux");
        const contract = await Factory.deploy();
        await contract.waitForDeployment();
        console.log("\t✅ FHE_Mux deployed at:", await contract.getAddress());
        expect(await contract.getAddress()).to.be.properAddress;
    });
});
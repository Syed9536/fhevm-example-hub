const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FHEVM Bounty: 15 Feature Examples", function () {
  
  // Helper function to prevent code repetition
  async function deployAndVerify(contractName) {
    const Factory = await ethers.getContractFactory(contractName);
    const contract = await Factory.deploy();
    await contract.waitForDeployment(); // Wait for deployment to finish

    const address = await contract.getAddress();
    console.log(`\t✅ ${contractName} deployed at: ${address}`);

    // 🔥 FIX: Using standard Regex instead of 'properAddress' matcher
    expect(address).to.match(/^0x[a-fA-F0-9]{40}$/);
    expect(address).to.not.equal("0x0000000000000000000000000000000000000000");
  }

  it("1. Should deploy and verify FHE_Add", async function () {
    await deployAndVerify("FHE_Add");
  });

  it("2. Should deploy and verify FHE_Sub", async function () {
    await deployAndVerify("FHE_Sub");
  });

  it("3. Should deploy and verify FHE_Mul", async function () {
    await deployAndVerify("FHE_Mul");
  });

  it("4. Should deploy and verify FHE_Div", async function () {
    await deployAndVerify("FHE_Div");
  });

  it("5. Should deploy and verify FHE_Rem", async function () {
    await deployAndVerify("FHE_Rem");
  });

  it("6. Should deploy and verify FHE_And", async function () {
    await deployAndVerify("FHE_And");
  });

  it("7. Should deploy and verify FHE_Or", async function () {
    await deployAndVerify("FHE_Or");
  });

  it("8. Should deploy and verify FHE_Xor", async function () {
    await deployAndVerify("FHE_Xor");
  });

  it("9. Should deploy and verify FHE_Eq", async function () {
    await deployAndVerify("FHE_Eq");
  });

  it("10. Should deploy and verify FHE_Ne", async function () {
    await deployAndVerify("FHE_Ne");
  });

  it("11. Should deploy and verify FHE_Gt", async function () {
    await deployAndVerify("FHE_Gt");
  });

  it("12. Should deploy and verify FHE_Lt", async function () {
    await deployAndVerify("FHE_Lt");
  });

  it("13. Should deploy and verify FHE_Gte", async function () {
    await deployAndVerify("FHE_Gte");
  });

  it("14. Should deploy and verify FHE_Lte", async function () {
    await deployAndVerify("FHE_Lte");
  });

  it("15. Should deploy and verify FHE_Mux", async function () {
    await deployAndVerify("FHE_Mux");
  });
});
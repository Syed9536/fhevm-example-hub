import { expect } from "chai";
import { ethers } from "hardhat";
import { createInstance } from "fhevmjs";
import { getSigners, initSigners } from "./signers";

describe("AccessControl", function () {
  before(async function () {
    await initSigners();
    this.signers = await getSigners();
  });

  beforeEach(async function () {
    const ContractFactory = await ethers.getContractFactory("AccessControl");
    this.contract = await ContractFactory.connect(this.signers.alice).deploy();
    await this.contract.waitForDeployment();
  });

  it("should allow owner to grant access to another user", async function () {
    // Alice gives access to Bob
    const tx = await this.contract.connect(this.signers.alice).grantAccess(this.signers.bob.address);
    await tx.wait();
    console.log("Access granted to Bob.");
    
    // In a real scenario, Bob can now reencrypt/decrypt.
    // If Bob wasn't allowed, the node would reject the decryption request.
  });
});
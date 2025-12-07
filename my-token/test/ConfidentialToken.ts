import { expect } from "chai";
import { ethers } from "hardhat";
import { createInstance } from "fhevmjs";
import { getSigners, initSigners } from "./signers";

describe("ConfidentialToken", function () {
  before(async function () {
    await initSigners();
    this.signers = await getSigners();
  });

  beforeEach(async function () {
    const ContractFactory = await ethers.getContractFactory("ConfidentialToken");
    this.contract = await ContractFactory.connect(this.signers.alice).deploy();
    await this.contract.waitForDeployment();
    this.contractAddress = await this.contract.getAddress();
    this.fhevm = await createInstance({ chainId: 31337, publicKey: await this.contract.publicKey() });
    
    // Mint 1000 tokens to Alice
    await this.contract.connect(this.signers.alice).mint(1000);
  });

  it("should transfer encrypted tokens", async function () {
    // Alice sends 100 to Bob
    const input = this.fhevm.createEncryptedInput(this.contractAddress, this.signers.alice.address)
      .test().add64(100).encrypt();
      
    const tx = await this.contract.connect(this.signers.alice).transfer(
        this.signers.bob.address, 
        input.handles[0], 
        input.inputProof
    );
    await tx.wait();
    
    console.log("Encrypted Transfer Executed.");
    // In a real test, we would reencrypt Bob's balance to verify it is 100.
  });
});
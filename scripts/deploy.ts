import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const FHECounter = await ethers.getContractFactory("FHECounter");
  const contract = await FHECounter.deploy();
  await contract.waitForDeployment();

  console.log("Deployed at:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// FIX: Added 'import type' to prevent runtime errors in ESM mode
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import type { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("\n🚀 Starting Deployment of 15 FHE Examples...");

  const contracts = [
    "FHE_Add", "FHE_Sub", "FHE_Mul", "FHE_Div", "FHE_Rem",
    "FHE_And", "FHE_Or", "FHE_Xor", 
    "FHE_Eq", "FHE_Ne", "FHE_Gt", "FHE_Lt", "FHE_Gte", "FHE_Lte",
    "FHE_Mux"
  ];

  for (const name of contracts) {
    const result = await deploy(name, {
      from: deployer,
      args: [],
      log: true,
    });
    console.log(`✅ ${name} deployed at: ${result.address}`);
  }

  console.log("\n🎉 All 15 Contracts Deployed Successfully!\n");
};

export default func;
func.tags = ["FHE_Examples"];

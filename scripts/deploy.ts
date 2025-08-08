// scripts/deploy.ts
import { ethers } from "hardhat";

async function main() {
  const PortfolioAgent = await ethers.getContractFactory("PortfolioAgent");
  const contract = await PortfolioAgent.deploy();
  await contract.waitForDeployment(); 
  console.log("PortfolioAgent deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// npx hardhat run scripts/deploy.ts --network sapphireTestnet
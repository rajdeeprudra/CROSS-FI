const hre = require("hardhat");

async function main() {
  const Lending = await hre.ethers.getContractFactory("Lending");
  const lending = await Lending.deploy();
  await lending.waitForDeployment();

  console.log("Lending deployed to:", await lending.getAddress());

  const CrossChain = await hre.ethers.getContractFactory("CrossChain");
  const cross = await CrossChain.deploy();
  await cross.waitForDeployment();

  console.log("CrossChain deployed to:", await cross.getAddress());
}

main();
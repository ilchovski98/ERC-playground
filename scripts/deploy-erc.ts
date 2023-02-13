import hre, { ethers } from "hardhat";

export async function deployErc() {
  try {
    const LimeToken = await hre.ethers.getContractFactory("LimeToken");
    const lime = await LimeToken.deploy();
    await lime.deployed();
    console.log("LimeCoin deployed to:", lime.address);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

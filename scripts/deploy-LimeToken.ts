import { ethers } from "hardhat";

export async function deployLimeToken() {
  try {
    const LimeToken = await ethers.getContractFactory("LimeToken");
    const lime = await LimeToken.deploy();
    await lime.deployed();
    console.log("LimeCoin deployed to:", lime.address);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

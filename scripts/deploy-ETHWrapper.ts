import hre, { ethers } from "hardhat";

export async function deployETHWrapper() {
  try {
    const ETHWrapperFactory = await ethers.getContractFactory("ETHWrapper");
    const ETHWrapperContract = await ETHWrapperFactory.deploy();
    console.log('Waiting for ETHWrapperContract deployment...');
    const deployTransaction = await ETHWrapperContract.deployed();
    console.log('deployTransaction', deployTransaction.deployTransaction);

    if (hre.network.name == 'goerli' || hre.network.name == 'sepolia') {
      console.log('waiting for 5 confirmation blocks...');
      await deployTransaction.deployTransaction.wait(5);
      console.log('5 confirmation blocks passed');
      try {
        await hre.run("verify:verify", {
          address: ETHWrapperContract.address,
        });
      } catch (error) {
        console.error(error.reason);
      }
    }
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

import hre, { ethers } from "hardhat";

export async function deployCarCollection() {
  try {
    const CarCollection = await ethers.getContractFactory("CarCollection");
    const CarCollectionContract = await CarCollection.deploy();
    const deployTransaction = await CarCollectionContract.deployed();
    console.log("CarCollection deployed to:", CarCollectionContract.address);

    if (hre.network.name == 'goerli' || hre.network.name == 'sepolia') {
      console.log('waiting for 5 confirmation blocks...');
      await deployTransaction.deployTransaction.wait(5);
      console.log('5 confirmation blocks passed');
      try {
        await hre.run("verify:verify", {
          address: CarCollectionContract.address,
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

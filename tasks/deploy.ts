import { task } from "hardhat/config";
import lazyImport from "../utils/lazyImport";

task("deploy-LimeToken", "Deploys ERC20")
  .setAction(async () => {
    const { deployLimeToken } = await lazyImport("./../scripts/deploy-LimeToken");
    await deployLimeToken();
  });

task("deploy-ETHWrapper", "Deploys ETHWrapper")
  .setAction(async () => {
    const { deployETHWrapper } = await lazyImport("./../scripts/deploy-ETHWrapper");
    await deployETHWrapper();
  });

task("deploy-NFT", "Deploys ERC721")
  .addParam("privateKey", "Deployer's private key")
  .setAction(async (taskArgs) => {
    const { deployNFT } = await lazyImport("./../scripts/deploy-NFT");
    await deployNFT(taskArgs.privateKey);
  });

task("deploy-CarCollection", "Deploys CarCollection ERC-1155")
  .setAction(async () => {
    const { deployCarCollection } = await lazyImport("./../scripts/deploy-CarCollection");
    await deployCarCollection();
  });

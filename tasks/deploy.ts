import { task } from "hardhat/config";
import lazyImport from "../utils/lazyImport";

task("deploy-erc", "Deploys ERC20")
  .setAction(async () => {
    const { deployErc } = await lazyImport("./../scripts/deploy-ETHWrapper");
    await deployErc();
  });

task("deploy-ETHWrapper", "Deploys ETHWrapper")
  .setAction(async () => {
    const { deployETHWrapper } = await lazyImport("./../scripts/deploy-ETHWrapper");
    await deployETHWrapper();
  });

task("deploy-nft", "Deploys ERC721")
  .addParam("privateKey", "Deployer's private key")
  .setAction(async (taskArgs) => {
    const { deployNFT } = await lazyImport("./../scripts/deploy-nft");
    await deployNFT(taskArgs.privateKey);
  });

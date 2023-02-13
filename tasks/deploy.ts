import { task } from "hardhat/config";
import lazyImport from "../utils/lazyImport";

task("deploy-erc", "Deploys the contract")
  .setAction(async () => {
    const { deployErc } = await lazyImport("./../scripts/deploy-ETHWrapper");
    await deployErc();
  });

task("deploy-ETHWrapper", "Deploys the contract")
  .setAction(async () => {
    const { deployETHWrapper } = await lazyImport("./../scripts/deploy-ETHWrapper");
    await deployETHWrapper();
  });

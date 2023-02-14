import { ethers } from "hardhat";
import { WETH__factory, ETHWrapper__factory } from "../typechain-types";

async function main() {
  const ETHWrapperFactory: ETHWrapper__factory = await ethers.getContractFactory("ETHWrapper");
  const wallet = (await ethers.getSigners())[0];
  const balance = await wallet.getBalance();
  console.log(ethers.utils.formatEther(balance) + " ETH");

  const wrapValue = ethers.utils.parseEther("0.1");
  const ETHWrapperContract = await ETHWrapperFactory.attach("0x9A162bE14C6d874C7f89ec67D1CEb86Cae721458");
  console.log(ETHWrapperContract.address)

  const WETHFactory: WETH__factory = await ethers.getContractFactory("WETH");
  const wethAddress = await ETHWrapperContract.WETHToken();
  const WETHContract = await WETHFactory.attach(wethAddress);

  // Wrap ETH
  // const tx = await ETHWrapperContract.wrap({value: wrapValue});
  // await tx.wait();

  // Unwrap ETH
  const approveTx = await WETHContract.approve(ETHWrapperContract.address, wrapValue);
  await approveTx.wait();
  const tx = await ETHWrapperContract.unwrap(wrapValue);
  await tx.wait();

  let contractETHBalance = await provider.getBalance(ETHWrapperContract.address);
  console.log("User ETH balance:", ethers.utils.formatEther(await wallet.getBalance()) + " ETH");
  console.log("Contract ETH balance:", ethers.utils.formatEther(contractETHBalance) + " ETH");
  console.log("Wrapper contract WETH:", ethers.utils.formatEther(await WETHContract.balanceOf(ETHWrapperContract.address)) + " WETH");
  console.log("User address WETH:", ethers.utils.formatEther(await WETHContract.balanceOf(wallet.address)) + " WETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

import { ethers } from "hardhat";
import { WETH__factory, ETHWrapper__factory } from "../typechain-types";

const GOERLI_KEY = process.env.GOERLI_KEY || '';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';

async function main() {
  const ETHWrapperFactory: ETHWrapper__factory = await ethers.getContractFactory("ETHWrapper");
  const provider = new ethers.providers.JsonRpcProvider();
  const wallet = await ethers.getSigner('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  const balance = await wallet.getBalance();
  console.log(ethers.utils.formatEther(balance) + " ETH");

  const wrapValue = ethers.utils.parseEther("6");
  const ETHWrapperContract = await ETHWrapperFactory.attach("0x5fbdb2315678afecb367f032d93f642f64180aa3");
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

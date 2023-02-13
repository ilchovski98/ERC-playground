import { ethers } from "hardhat";

export async function deployNFT(_privateKey: string) {
  const wallet = new ethers.Wallet(_privateKey, ethers.provider); // New wallet with the privateKey passed from CLI as param
  const NFT_factory = await ethers.getContractFactory("NFT");
  console.log("Deploying contracts with the account:", wallet.address); // We are printing the address of the deployer
  const nft = await NFT_factory.connect(wallet).deploy();
  await nft.deployed();
  console.log(`The NFT contract is deployed to ${nft.address}`);
}

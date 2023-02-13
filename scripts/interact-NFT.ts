import { ethers } from "hardhat";
import { NFT__factory } from "../typechain-types";

async function main() {
  const NFTFactory: NFT__factory = await ethers.getContractFactory("NFT");
  const provider = new ethers.providers.JsonRpcProvider();
  // const provider = new ethers.providers.InfuraProvider('goerli', GOERLI_KEY);
  const wallet = (await ethers.getSigners())[0];
  // const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const NFTContract = await NFTFactory.attach("0x8464135c8F25Da09e49BC8782676a84730C318bC");
  console.log(NFTContract.address);

  const uri = "https://ipfs.io/ipfs/QmYYD42AZeK46q6MoZxVXJRAy5Yh8Em5C21F1HWRNJMBkB";

  const tx = await NFTContract.safeMint(uri, wallet.address);
  await tx.wait();

  const tx2 = await NFTContract.safeMint(uri, wallet.address);
  await tx2.wait();

  const tx3 = await NFTContract.safeMint(uri, wallet.address);
  await tx3.wait();

  for (let index = 1; index <= 3; index++) {
    const uriFromContract = await NFTContract.tokenURI(index);
    console.log(`The token ${index} URI is `, uriFromContract);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

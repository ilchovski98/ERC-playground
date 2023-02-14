import { ethers } from "hardhat";
import axios from "axios";

import { CarCollection__factory } from "../typechain-types";

async function main() {
  const CarCollectionFactory: CarCollection__factory = await ethers.getContractFactory("CarCollection");
  const wallet = (await ethers.getSigners())[0];
  const CarCollectionContract = await CarCollectionFactory.attach("0x5fbdb2315678afecb367f032d93f642f64180aa3");
  const uri = await CarCollectionContract.uri(1);

  console.log('BMW', await axios.get(uri.replace('{id}', '1')).then(res => res.data).catch(error => console.error(error)));
  console.log('Audi', await axios.get(uri.replace('{id}', '2')).then(res => res.data).catch(error => console.error(error)));
  console.log('Toyota', await axios.get(uri.replace('{id}', '3')).then(res => res.data).catch(error => console.error(error)));

  console.log('balance of BMW', await CarCollectionContract.balanceOf(wallet.address, 1));
  console.log('balance of Audi', await CarCollectionContract.balanceOf(wallet.address, 2));
  console.log('balance of Toyota', await CarCollectionContract.balanceOf(wallet.address, 3));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

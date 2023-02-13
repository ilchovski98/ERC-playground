// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
contract carCollection is ERC1155 {
  uint256 public constant BMW = 1;
  uint256 public constant AUDI = 2;
  uint256 public constant Toyota = 3;
  constructor()
    ERC1155(
      "https://bafybeibcdqabhqrvma6qzqzpr2rnk5qkw6fpwpdxsnxm2qcigriyq4uh5q.ipfs.nftstorage.link/{id}.json"
    )
  {
    _mint(msg.sender, BMW, 1, "");
    _mint(msg.sender, AUDI, 1, "");
    _mint(msg.sender, Toyota, 1, "");
  }
}

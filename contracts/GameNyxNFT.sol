// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/*** @title GameNyx NFT Smart Contract 
* @author Koleen Paunon and BlockShots team @ https://blockshots.io
* @notice This contract handles the ERC721 implementation, which allowas users to mint, burn and transfer their NFTs.
*/
contract GameNyxNFT is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    /*** @notice In order to mint, users need to pay 0.001 ETH */
    uint256 public MINTING_FEE = 0.001 ether;

    /*** @notice Maximum number of NFTs that can be minted is 777 */
    uint public MAX_SUPPLY = 777;


    constructor() ERC721("GameNyx NFT", "GNX") {}

   function safeMint(address to, string memory uri)
        public
        payable
    {
        require(msg.value >= MINTING_FEE, "Please pay the minting fee to proceed");
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }



    /*** @notice Fetched the current contract balance or total ethers sent to this contract */
    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }

    /*** @notice Withdraw function. This will withdraw all the funds from the contract from the minting */
     function withdraw() public onlyOwner {
        require(address(this).balance > 0, "Contract Balance: 0; Nothing to withdraw here!");
        payable(owner()).transfer(address(this).balance);
    }

}
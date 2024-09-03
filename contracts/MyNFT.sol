// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721Enumerable,Ownable {
    
    string[] public promptDescription;

    
    string public baseUrl = "ipfs://bafybeidmme6am4y47ikr6keqr3cwh4q7psjnquiu3sieeuxe5rhpefszwm/";

    constructor() ERC721("Nikhils_NFT", "NID") {
        promptDescription = ["Anime character",
                                "Big Bird",
                                "Animal on other planet",
                                "cartoon character.",
                                "trained Dog"];

        for (uint256 i = 0; i < promptDescription.length; i++) {
            _mint(msg.sender, i + 1);
        }
    }

    function mint(uint256 quantity) external payable onlyOwner {
        require(quantity <= 5, "You can only mint up to 5 NFTs at a time");
        require(totalSupply() + quantity <= 100, "Maximum NFT supply reached");

        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = totalSupply() + 1;
            _mint(msg.sender, tokenId);
        }
    }

    
    function _baseURI() internal view override returns (string memory) {
        return baseUrl;
    }

    
    function getPromptDescriptions() external view returns (string[] memory) {
        return promptDescription;
    }
}  





















































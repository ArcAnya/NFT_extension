// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract VideoNFT is ERC721 {
    
    constructor() ERC721("VideoNFT", "VID") {
        // constructor = function run whenever deployed for 1st time on Blockchain
        // ERC721 wants a "name" and a "symbol" as arguments => for token collection
        
    }

}
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract VideoNFT is ERC721 {

    string[] public videos;

    mapping(string => bool) _videoExists;
    
    constructor() ERC721("VideoNFT", "VID") {
        // constructor = function run whenever deployed for 1st time on Blockchain
        // ERC721 wants a "name" and a "symbol" as arguments => for token collection
        // nothing else needed - imports ERC721?
    }

    function mint(string memory _video) public {
        require(!_videoExists[_video]); // make sure the video is not an NFT yet
        uint _id = videos.length; // attribute an id = to index in array videos
        videos.push(_video); 
        _safeMint(msg.sender, _id); // using function _safeMint from ERC721
        _videoExists[_video] = true;
    }

}
// migration file to put smart contracts on blockchain (moving or changing data)
// must be numbered to know in which order migrate

const VideoNFT = artifacts.require("VideoNFT");

module.exports = function(deployer) {
    deployer.deploy(VideoNFT);
};
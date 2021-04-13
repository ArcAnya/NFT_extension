const VideoNFT = artifacts.require('./VideoNFT.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('VideoNFT', (accounts) => {
    describe('deployment', async () => {
      // async needed because interaction with blockchain
      it('deploys successfully', async () => {
        
      })
    })
})
const { assert } = require('chai')

const VideoNFT = artifacts.require('./VideoNFT.sol')

contract('VideoNFT', (accounts) => {

  let contract // declaring variable for contract instance

  before(async () => {
    contract = await VideoNFT.deployed()
  })

  describe('deployment', async () => {
    // async needed because interaction with blockchain
    it('deploys successfully', async () => {
      // checking that the contract has an address not null
      const address = contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })
})
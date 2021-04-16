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

    it('has a name', async () => {
      // checking that the contract has a name
      const name = await contract.name()
      // question: why is the constant declaration different than for address?
      assert.equal(name, 'VideoNFT')
    })

    it('has a symbol', async () => {
      // checking that the contract has a symbol (why are there symbols as well?)
      const symbol = await contract.symbol()
      assert.equal(symbol, 'VID')
    })

  })

  describe('minting', async () => {

    it('creates a new token', async () => {

      const result = await contract.mint('Video1')
      //const result2 = await contract.mint('Video2')
      // const totalSupply = await contract.totalSupply()

      // Testing success cases:
      // assert.equal(totalSupply, 1)
      console.log(result)
      //console.log(await contract.videos())
      const event = result.logs[0].args
      console.log(event)
      // console.log(result2)

      // Testing the failure cases (same video again):

    })

  })


})
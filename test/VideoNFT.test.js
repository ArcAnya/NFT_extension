const { assert } = require('chai')

const VideoNFT = artifacts.require('./VideoNFT.sol')

require('chai') // import chai framework
    .use(require('chai-as-promised'))
    .should()

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

      result = await contract.mint('Video1')
     
      const bignumber = await contract.balanceOf(accounts[0])
      // balanceOf is applied to the "accounts" created when testing by Ganache
      // the account at index 0 will be used first for all the transactions happening
      // so this is why we refer to: accounts[0]
      // THEN balanceOf will return a BN = BigNumber 
      // => the actual balance of tokens minted is in words[0]...
      balance = bignumber.words[0]

      // Testing success cases:

      assert.equal(balance, 1)
      // console.log(result)
      const event = result.logs[0].args
      // console.log(event.tokenId.toNumber())
      assert.equal(event.from, 0x0000000000000000000000000000000000000000, "from is correct")
      assert.equal(+event.tokenId, 0, "id is correct") // replaced .toNumber() with + because it also converts to a number
      assert.equal(event.to, accounts[0], "to is correct")

      // Testing the failure cases (same video again):
      await contract.mint('Video1').should.be.rejected;
    })

  })

  describe('indexing', async () => {
    
    it('creates 3 tokens', async () => {

      await contract.mint('Vid1')
      await contract.mint('Vid2')
      await contract.mint('Vid3')

      let expected = ['Video1', 'Vid1', 'Vid2', 'Vid3']
      let video
      let result = []

      for(i = 0; i < expected.length; i++) {
        video = await contract.videos(i)
        result.push(video)
      }

      assert.equal(result.join(','), expected.join(','))

    })

  })


})
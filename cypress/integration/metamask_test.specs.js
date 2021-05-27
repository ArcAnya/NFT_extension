describe('User can load page', () => {
    before(() => {
      cy.setupMetamask();
      cy.changeMetamaskNetwork('localhost')
      cy.switchToMetamaskWindow()
        cy.importMetaMaskWalletUsingPrivateKey('0x8109615b525591fb53b340d62929a0baa79a91c106ed839c156e1d08263b8f14')
    cy.changeAccount(2)
cy.switchToCypressWindow()
      cy.visit('/')
    });
    it('is expected to display a success message', () => {
      cy.get('[data-cy=title]').should('contain.text', 'MetaMask Detected')
    });
    
    it('is expected to display the local wallet address', () => {
      cy.get('[data-cy=address').should('contain.text', 'Your address is: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')
    });
    
    it('is expected to display the local wallet  balance', () => {
      cy.get('[data-cy=balance').should('contain.text', 'Balance: 10000000000000000000000')
    });
  })
  
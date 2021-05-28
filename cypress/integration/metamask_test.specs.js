describe('User can load page', () => {
  before(() => {
    cy.setupMetamask();
    cy.changeMetamaskNetwork('localhost')
    cy.switchToMetamaskWindow()
    cy.importMetaMaskWalletUsingPrivateKey('0x32853dbfcdf59a0ed056e64a9d671a06d31c4822d406e50d3526accef472542d')
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

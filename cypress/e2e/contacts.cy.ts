const apiContacts = `${Cypress.env("apiUrl")}/contacts`;

describe("Contacts index", () => {
  beforeEach(() => {
    cy.visit('/contacts')
  });

  it('should display Table component', () => {
    cy.contains("Contact Info").should("be.visible")
  });

  it('should display 5 elements in the beginning', () => {
    cy.get(".MuiTableBody-root").find('.MuiTableRow-root').should('have.length', 5)
  });

  it('should fetch data from bkbn API', () => {
    cy.intercept('GET', '/contacts/*', { fixture: 'contacts.json' })
  });

})
describe("Contacts index", () => {
    beforeEach(() => {
      cy.visit('/contacts')
    });
  
    it('should create new contact', () => {
        cy.get('.MuiButtonBase-root').contains('New Contact').click()
        cy.get('input[name="firstName"]').type("Aaron")
        cy.get('input[name="lastName"]').type("Doe")
        cy.get('input[name="phone"]').type("3332103366")
        cy.get('input[name="email"]').type("adoe99@gmail.com")
        cy.get('.MuiButtonBase-root').click()
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)').should('contain.text', '3332103366')
    });
  
  })
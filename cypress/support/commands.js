Cypress.Commands.add('goToAddUserForm', () => {
  cy.visit('/');
  cy.get('button.addUserButton').should('exist').click();
});

Cypress.Commands.add('fillUserForm', () => {
  cy.get('input#name').should('exist').type('testing this');
  cy.get('input#address').should('exist').type('testing 248');
});

Cypress.Commands.add('fillBadUserFormOne', () => {
  cy.get('input#name').should('exist').type('te');
  cy.get('input#address').should('exist').type('te');
});

Cypress.Commands.add('fillBadUserFormTwo', () => {
  cy.get('input#name').should('exist').type('st');
});

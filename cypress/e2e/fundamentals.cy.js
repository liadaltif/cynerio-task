describe('Add A New User', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('Logs onto the Landing Page', () => {
  })
  
  it('Checks for the Add User button and clicks it', () => {
    cy.get('button.addUserButton').should('exist').click();
  });

  it('Checks if there are Name and Address Form Inputs, and fills it', () => {
    cy.goToAddUserForm();
    cy.fillUserForm();
  });

  it('Checks if there are Confirm and Cancel Buttons, and Fails it on purpose', () => {
    cy.goToAddUserForm();
    cy.fillBadUserFormOne();
    cy.get('button.confirmButton').click();
    cy.get('div.errorMessage').should('exist').and('have.text', 'Name should contain only letters and be between 3 and 32 characters');

    cy.fillBadUserFormTwo();
    cy.get('button.confirmButton').click();
    cy.get('div.errorMessage').should('exist').and('have.text', 'Address should contain only letters, numbers, and spaces, and be between 3 and 100 characters');

  });

  it('Checks if there are Confirm and Cancel Buttons, creates a new user, and checks if it Got Created', () => {
    cy.get('table.custom-table tbody tr').should('not.exist');
  
    cy.goToAddUserForm();
    cy.fillUserForm();
  
    cy.get('button.cancelButton').should('exist');
    cy.get('button.confirmButton').should('exist').click();
  
    cy.get('table.custom-table tbody tr').should('have.length', 2);  //Because theres 2 rows of the same person, because theres 2 tables... right? right!.
  });

  it('Checks if there is a Search input, and check if it works', () => {
    cy.get('input.searchField').should('exist').type('test')
    cy.get('table.custom-table tbody tr').should('have.length', 2);
    cy.get('input.searchField').should('exist').type('s')
    cy.get('table.custom-table tbody tr').should('have.length', 1);

  })

  it('Checks if theres DELETE Button, and deletes the User', () => {
    cy.get('button.deleteButton').should('exist').click()
    cy.get('button.cancelButton').should('exist')
    cy.get('button.confirmButton').should('exist').click()
    cy.get('table.custom-table tbody tr').should('not.exist');
  })

  let userId; //Helping me store the id of the user I am about to create, so I could, easily delete him later.

  it('Should create a new user', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/users', //Remember, since the baseUrl is the Frontend Url, you have to write the whole Backend Url, but get advice from a proffesional who knows what he actually talks about because there must be a better, elegant, sohpisticated way of doing such thing.
      body: {
        "Name": "John Doe",
        "Address": "123 Main St"
      },
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.equal(201); 
      expect(response.body.message).to.equal("User created successfully");

      userId = response.body.id;

    });
  });

  it('Should delete the new user', () => {
    cy.request({
      method: 'DELETE',
      url: `http://localhost:5000/api/users/${userId}`,
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.body.message).to.equal("User deleted successfully");
    });

    cy.visit('/') // To refresh the site.
    
  });


});

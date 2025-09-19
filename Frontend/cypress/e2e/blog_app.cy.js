// checking if login page is showing
describe('Login', function () {
  it('front page can be opened', () => {
    cy.visit('')
    cy.contains('login')
  })

  Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
      cy.visit('')
    })
  })


describe('Blog App check', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: "Lily", 
      name: "Snape", 
      password: "password123"
    }
    const user1 = {
      username: "Harry", 
      name: "Harry", 
      password: "password124"
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    
    
    cy.visit("")
  })
    // check if the created user can login successfully
      it('succeeds with correct username and password', function (){
        cy.get('#username').type('Lily')
        cy.get('#password').type('password123')
        cy.get('#login-button').click()
        cy.contains('Snape logged in!')
      })
      it('fails with incorrect username and password', function (){
        // Lily -> lily
        cy.get('#username').type('lily')
        cy.get('#password').type('password123')
        cy.get('#login-button').click()
        cy.contains('wrong credentials')
      })
  })
  describe("logged in user operations", function() {
    beforeEach(function () {
      cy.visit("")
  });
    it('logged in user can add a blog', function() {
        cy.get('#username').type('Lily')
         cy.get('#password').type('password123')
        cy.get('#login-button').click()
        cy.contains('Add Blog').click()
         cy.get('#title').type('How to cook pasta')
         cy.get('#author').type('Martha Stewart')
         cy.get('#url').type('www.matha.com')
         cy.contains('Done').click()
         cy.contains("How to cook pasta");
    })

    it('user can like a blog', function() {
      cy.get('#username').type('Harry')
      cy.get('#password').type('password124')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.contains('Increase Likes').click()
      cy.contains('1')
    })
    it('only the user who created the blog can see delete', function() {
      cy.get('#username').type('Harry')
      cy.get('#password').type('password124')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.contains('delete').should("not.exist")
    })
    it('blogs are sorted by likes', function() {
      cy.get('#username').type('Harry')
       cy.get('#password').type('password124')
      cy.get('#login-button').click()
      cy.contains('Add Blog').click()
       cy.get('#title').type('How to cook pizza')
       cy.get('#author').type('Martha')
       cy.get('#url').type('www.mathasteward.com')
       cy.contains('Done').click()
       cy.contains('view').click()
       cy.contains('view').click()
       cy.get(".blog")
       .eq(0)
       .should("contain", "1");
       cy.get(".blog")
       .eq(1)
       .should("contain", "0");

  })
   it('the user who created the blog can delete it', function(){
    cy.get('#username').type('Harry')
    cy.get('#password').type('password124')
    cy.get('#login-button').click()
    cy.contains('view').click()
    cy.contains('view').click()
    cy.contains('delete').click()
    cy.contains('How to cook pizza').should("not.exist")

   })
    

  })
})

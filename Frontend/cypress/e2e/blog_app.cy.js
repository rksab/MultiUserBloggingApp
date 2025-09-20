// checking if login page is showing
// checking if login page is showing
describe('Login', function () {
  it('front page can be opened', () => {
    cy.visit('http://localhost:5173')
    cy.contains('login')
  })

  describe('Blog App check', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3002/api/testing/reset')
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
      cy.request('POST', 'http://localhost:3002/api/users', user)
      cy.request('POST', 'http://localhost:3002/api/users', user1)
    })

    it('succeeds with correct username and password', function () {
      cy.visit('http://localhost:5173')
      cy.get('#username').type('Lily')
      cy.get('#password').type('password123')
      cy.get('#login-button').click()
      cy.contains('Snape logged in!')
    })

    it('fails with incorrect username and password', function () {
      cy.visit('http://localhost:5173')
      cy.get('#username').type('lily')
      cy.get('#password').type('password123')
      cy.get('#login-button').click()
      cy.contains("wrong credentials")
    })
  })

  describe("logged in user operations", function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3002/api/testing/reset')
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
      cy.request('POST', 'http://localhost:3002/api/users', user)
      cy.request('POST', 'http://localhost:3002/api/users', user1)
    })

    it('logged in user can add a blog', function () {
      cy.login('Lily', 'password123')
      cy.visit('http://localhost:5173')
      cy.contains('Add Blog').click()
      cy.get('#title').type('How to cook pasta')
      cy.get('#author').type('Martha Stewart')
      cy.get('#url').type('www.matha.com')
      cy.contains('Done').click()
      cy.contains("How to cook pasta")
    })

    it('user can like a blog', function () {
      // First create a blog for Harry to like
      cy.login('Lily', 'password123')
      cy.visit('http://localhost:5173')
      cy.contains('Add Blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('www.test.com')
      cy.contains('Done').click()

      // Now login as Harry and like the blog
      cy.login('Harry', 'password124')
      cy.visit('http://localhost:5173')
      cy.contains('view').click()
      cy.contains('Increase Likes').click()
      cy.contains('1')
    })

    it('only the user who created the blog can see delete', function () {
      // Create blog as Lily
      cy.login('Lily', 'password123')
      cy.visit('http://localhost:5173')
      cy.contains('Add Blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('www.test.com')
      cy.contains('Done').click()

      // Login as Harry and check no delete button
      cy.login('Harry', 'password124')
      cy.visit('http://localhost:5173')
      cy.contains('view').click()
      cy.contains('delete').should("not.exist")
    })

    it('blogs are sorted by likes', function () {
      // Create first blog as Lily
      cy.login('Lily', 'password123')
      cy.visit('http://localhost:5173')
      cy.contains('Add Blog').click()
      cy.get('#title').type('How to cook pasta')
      cy.get('#author').type('Martha Stewart')
      cy.get('#url').type('www.matha.com')
      cy.contains('Done').click()

      // Create second blog as Harry
      cy.login('Harry', 'password124')
      cy.visit('http://localhost:5173')
      cy.contains('Add Blog').click()
      cy.get('#title').type('How to cook pizza')
      cy.get('#author').type('Martha')
      cy.get('#url').type('www.mathasteward.com')
      cy.contains('Done').click()

      // Like the first blog
      cy.contains('How to cook pasta').parent().contains('view').click()
      cy.contains('Increase Likes').click()

      // Check sorting
      cy.contains('How to cook pasta').parent().contains('view').click()
      cy.contains('How to cook pizza').parent().contains('view').click()
      cy.get(".blog").eq(0).should("contain", "1")
      cy.get(".blog").eq(1).should("contain", "0")
    })

    it('the user who created the blog can delete it', function () {
      cy.login('Lily', 'password123')
      cy.visit('http://localhost:5173')
      cy.contains('Add Blog').click()
      cy.get('#title').type('How to cook pasta')
      cy.get('#author').type('Martha Stewart')
      cy.get('#url').type('www.matha.com')
      cy.contains('Done').click()

      cy.contains('view').click()
      cy.contains('delete').click()
      cy.contains('How to cook pasta').should("not.exist")
    })
  })
})
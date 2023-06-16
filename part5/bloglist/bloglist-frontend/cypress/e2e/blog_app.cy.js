describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#login-form')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('lukaku')
      cy.get('#login-button').click()

      // cy.contains('Wrong username or password')
      cy.get('.message--error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'background-color', 'rgb(255, 0, 0)')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })

      cy.get('#new-blog').click()

      cy.get('#title').type('How not to die')
      cy.get('#author').type('Rick Astley')
      cy.get('#url').type('www.test.com')

      cy.get('.submit-btn').click()
    })

    it('A blog can be created', function () {
      cy.get('.message--success') //the classname of the green message
        .should(
          'contain',
          "Blog 'How not to die' by Rick Astley has been added"
        )
        .and('have.css', 'background-color', 'rgb(0, 128, 0)') //not 0, 255, 0 because its a light green
    })
    it('A user can like a blog', function () {
      cy.get('.show-btn').click()
      cy.get('.like-btn').click()
      cy.get('.like-count').should('contain', 'likes: 1')
    })
    it('A user can delete the blog they posted', function () {
      cy.get('.show-btn').click()
      cy.get('.delete-btn').click()
      cy.get('#blog-list').should('not.contain', 'Rick Astley')
    })
    it('Only the user that posted the blog can see delete button', function () {
      cy.get('#logout-btn').click()
      cy.request('POST', 'http://localhost:3003/api/users/', {
        name: 'NotMatti Luukkainen',
        username: 'notmluukkai',
        password: 'notsalainen',
      })
      cy.login({ username: 'notmluukkai', password: 'notsalainen' })

      cy.get('.show-btn').click()
      cy.get('.blog').should('not.contain', 'delete')
    })

    it('Blogs are sorted according to number of likes', function () {
      // liking the first blog (posted via beforeEach) once
      cy.get('.show-btn').click()
      cy.get('.like-btn').click()
      cy.get('.like-count').should('contain', 'likes: 1')

      // posting a second blog
      cy.get('#title').type('Never gonna give you up')
      cy.get('#author').type('Rick Astley')
      cy.get('#url').type('www.rickroll.com')
      cy.get('.submit-btn').click()
      cy.wait(500)

      // liking the second blog twice
      cy.get('.show-btn').eq(1).click()
      cy.get('.like-btn').eq(1).click()
      cy.wait(500)
      cy.get('.like-btn').eq(1).click()
      cy.get('.like-count').eq(1).should('contain', 'likes: 2')

      // posting a third blog
      cy.get('#title').type('Together Forever')
      cy.get('#author').type('Rick Astley')
      cy.get('#url').type('www.lukakuwtf.com')
      cy.get('.submit-btn').click()

      // liking third blog thrice
      cy.get('.show-btn').eq(2).click()
      cy.get('.like-btn').eq(2).click()
      cy.wait(500)
      cy.get('.like-btn').eq(2).click()
      cy.wait(500)
      cy.get('.like-btn').eq(2).click()
      cy.get('.like-count').eq(2).should('contain', 'likes: 3')

      cy.reload() // page needs to reload so most liked goes first

      cy.get('.show-btn').eq(0).click() // finally, if the first blog is now the one with 3 likes, then the test was passed
      cy.get('.like-count').should('contain', 'likes: 3')
      cy.get('.blog').eq(0).should('contain', 'Together Forever')
    })
  })
})

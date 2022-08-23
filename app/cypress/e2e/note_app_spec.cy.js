describe('Note App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')

    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Miguel',
      username: 'midudev',
      password: 'lamidupassword'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('login form can be opened', () => {
    cy.contains('Show login').click()
  })

  it('user can login', () => {
    cy.contains('Show login').click()
    // cy.get('input:first').type('midudev')
    // cy.get('input').last().type('lamidupassword')
    cy.get('[placeholder="Username"]').type('midudev')
    cy.get('[placeholder="Password"]').type('lamidupassword')
    cy.get('#form-login-button').click()
    cy.contains('Create a new note')
  })

  it('login fails with wrong password', () => {
    cy.contains('Show login').click()
    cy.get('[placeholder="Username"]').type('midudev')
    cy.get('[placeholder="Password"]').type('password-incorrecta')
    cy.get('#form-login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'border-style', 'solid')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'midudev', password: 'lamidupassword' })
    })

    it('a new note can be created', () => {
      const noteContent = 'a note created by cypress'
      cy.contains('New Note').click()
      cy.get('input').type(noteContent)
      cy.contains('Save').click()
      cy.contains(noteContent)
    })

    // describe.only('and a note exists', () => {
    //   beforeEach(() => {
    //     cy.createNote({ content: 'This is the first note', important: false })
    //     cy.createNote({ content: 'This is the second note', important: false })
    //     cy.createNote({ content: 'This is the third note', important: false })
    //   })

    //   it('it can be made important', () => {
    //     cy.contains('This is the second note').as('theNote')

    //     cy.get('@theNote')
    //       .contains('make important')
    //       .click()
        
    //     cy.get('@theNote')
    //       .contains('make not important')
    //   })
    // })
  })
})
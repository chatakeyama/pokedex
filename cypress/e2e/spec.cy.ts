describe('Form Registration', () => {

  beforeEach(() => {

    cy.visit('http://localhost:4200/add');

    cy.get('[data-test="nome"]').as('nome')
    cy.get('[data-test="descricao"]').as('descricao')
    cy.get('[data-test="altura"]').as('altura')
    cy.get('[data-test="peso"]').as('peso')
    cy.get('[data-test="categoria"]').as('categoria')
    cy.get('[data-test="habilidade"]').as('habilidade')
    cy.get('[data-test="ataque"]').as('ataque')
    cy.get('[data-test="defesa"]').as('defesa')
    cy.get('[data-test="velocidade"]').as('velocidade')
    cy.get('[data-test="submit"]').as('submit')

  })

  it('The submit button should be disabled if there are any errors', () => {
   
    cy.get('@nome').type('G')
    cy.get('@descricao').type('Born from gases, anyone would faint if engulfed by its gaseous body, which contains poison. ')
    cy.get('@altura').click()
    cy.get('@peso').type('0.1')
    cy.get('@categoria').type('Gás')
    cy.get('@habilidade').click()
    cy.get('@ataque').type('3')
    cy.get('@defesa').type('3')
    cy.get('@velocidade').type('5')

    cy.get('@submit').should('have.class', 'mat-button-disabled')

  })

  it(`The pokémon Gastly should be appear on the list when added and 
    it can be removed`, () => {

    cy.get('@nome').type('Gastly')
    cy.get('@descricao').type('Born from gases, anyone would faint if engulfed by its gaseous body, which contains poison. ')
    cy.get('@altura').type('1.3')
    cy.get('@peso').type('0.1')
    cy.get('@categoria').type('Gas')
    cy.get('@habilidade').type('Levitation')
    cy.get('@ataque').type('3')
    cy.get('@defesa').type('3')
    cy.get('@velocidade').type('5')

    cy.get('@submit').click()
    cy.wait(3000)
    cy.visit('http://localhost:4200/list');
    cy.wait(2000)
    cy.get('[data-test="pokemon-name"]').contains('Gastly').click()
    cy.wait(3000)
    cy.get('[data-test="remove-btn"]').click()

  })

})
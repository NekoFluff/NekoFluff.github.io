import Divider from '../Divider.vue'

describe('Divider.vue', () => {
  it('renders a horizontal line', () => {
    cy.mount(Divider)

    cy.get('hr').should('have.class', 'w-full').and('have.class', 'h-0.5')
  })
})

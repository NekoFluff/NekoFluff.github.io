import Section from '../Section.vue'

describe('Section', () => {
    it('should render a heading element', () => {
        cy.mount(Section)
        cy.get('[data-cy="section-header"]').should('exist')
    })

    it('should display a slot', () => {
        cy.mount(Section, {
            slots: {
                default: 'Hello World'
            }
        })
        cy.get('[data-cy="section"]').should('contain', 'Hello World')
    })
})
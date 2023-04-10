import Card from '../Card.vue'

describe('Card', () => {
    it('renders a header', () => {
        cy.mount(Card, {
            slots: {
                header: 'My Header'
            }
        })

        cy.get('[data-cy="header"]').contains('My Header')
    })

    it('renders a body', () => {
        cy.mount(Card, {
            slots: {
                default: 'My Body'
            }
        })

        cy.get('[data-cy="body"]').contains('My Body')
    })

    it('renders a footer', () => {
        cy.mount(Card, {
            slots: {
                actions: 'My Footer'
            }
        })

        cy.get('[data-cy="footer"]').contains('My Footer')
    })

    it('renders a header, body, and footer', () => {
        cy.mount(Card, {
            slots: {
                header: 'My Header',
                default: 'My Body',
                actions: 'My Footer'
            }
        })
        cy.get('[data-cy="header"]').contains('My Header')
        cy.get('[data-cy="body"]').contains('My Body')
        cy.get('[data-cy="footer"]').contains('My Footer')
    })

    it('renders a header and body', () => {
        cy.mount(Card, {
            slots: {
                header: 'My Header',
                default: 'My Body'
            }
        })
        cy.get('[data-cy="header"]').contains('My Header')
        cy.get('[data-cy="body"]').contains('My Body')
        cy.get('[data-cy="footer"]').should('not.exist')
    })
})
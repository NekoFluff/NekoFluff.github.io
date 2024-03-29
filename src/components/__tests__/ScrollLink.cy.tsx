import ScrollLink from '../ScrollLink.vue'

describe('ScrollLink', () => {
    it('should scroll to the target element', () => {
        cy.mount(ScrollLink, {
            props: {
                targetId: 'target',
                callback: cy.spy().as('callback'),
            },
            slots: {
                default: 'Click me',
            },
        })

        cy.document().then((doc) => {
            const target = doc.createElement('div')
            target.id = 'target'
            target.innerHTML = 'Target'
            target.scrollIntoView = cy.spy().as('scrollIntoView')
            doc.body.appendChild(target)
        })

        cy.get('button').click()
        cy.get('@scrollIntoView').should('have.been.called')
        cy.get('@callback').should('have.been.called')
    })

    it('should not call the callback when the target element is not found', () => {
        cy.document().then((doc) => {
            const el = doc.getElementById('target')
            if (el) {
                el.remove()
            }
        })

        cy.mount(ScrollLink, {
            props: {
                targetId: 'target',
                callback: cy.spy().as('callback'),
            },
            slots: {
                default: 'Click me',
            },
        })

        cy.get('button').click()
        cy.get('@callback').should('not.have.been.called')
    })
})

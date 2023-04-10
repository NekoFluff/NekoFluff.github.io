import SearchBar from "../SearchBar.vue";

describe("SearchBar", () => {
    it("should render the component", () => {
        cy.mount(SearchBar, {
            props: {
                options: [
                    { text: "First", image: undefined },
                    { text: "Second", image: undefined },
                    { text: "Third", image: undefined },
                ]
            }
        })

        cy.get("[data-cy=searchBar]").should("exist")
        cy.get("[data-cy=searchResult]").should("have.length", 0)
    })

    it("should display the search results when the user types", () => {
        cy.mount(SearchBar, {
            props: {
                options: [
                    { text: "First", image: undefined },
                    { text: "Second", image: undefined },
                    { text: "Third", image: undefined },
                ]
            }
        })

        cy.get("[data-cy=searchBar]").type("F")
        cy.get("[data-cy=searchResults]").should("exist")
        cy.get("[data-cy=searchResult]").should("have.length", 1)
    })

    it("should emit the searchResultClick event when a search result is clicked", () => {
        cy.mount(SearchBar, {
            props: {
                options: [
                    { text: "First", image: undefined },
                    { text: "Second", image: undefined },
                    { text: "Third", image: undefined },
                ]
            },
            emits: {
                searchResultClick: cy.spy().as('searchResultClick'),
            }
        })

        cy.get("[data-cy=searchBar]").type("F")
        cy.get("[data-cy=searchResult]").first().click()
        cy.get('@searchResultClick').should('have.been.calledWith', 'First')
    })
})
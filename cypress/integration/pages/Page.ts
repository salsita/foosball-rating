export class Page {
  constructor(protected url: string) {}

  visit(): Page {
    cy.visit(this.url)
    return this
  }

  locate(): void {
    cy.url().should('include', this.url)
  }

  getContent(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#container')
  }

  getHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#header')
  }
}

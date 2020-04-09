export class DashboardPage {
  constructor(private gameName: string) {}
  visit(): void {
    cy.visit(`/${this.gameName}`)
  }
  getContent(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#dashboard')
  }
}

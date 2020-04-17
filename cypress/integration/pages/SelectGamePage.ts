import { Page } from './Page'
import { DashboardPage } from './DashboardPage'

export class SelectGamePage extends Page {
  constructor() {
    super('/')
  }

  visit(): SelectGamePage {
    super.visit()
    return this
  }

  selectGame(gameName: string): DashboardPage {
    cy.get('#select-game-input').select(gameName)
    return new DashboardPage(gameName)
  }

  locate(): void {
    super.locate()
    this.getContent()
      .should('contain.text', 'Games')
      .should('contain.text', 'Select the game!')
  }
}

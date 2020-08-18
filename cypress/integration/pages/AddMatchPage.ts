import { Page } from './Page'
import { Player } from '../types/Player'
import { DashboardPage } from './DashboardPage'

export class AddMatchPage extends Page {
  constructor(private gameName: string) {
    super(`/${gameName}/create-match`)
  }

  visit(): AddMatchPage {
    super.visit()
    return this
  }

  locate(): void {
    super.locate()
    this.getContent()
      .should('contain.text', 'Team 1')
      .should('contain.text', 'Team 2')
  }

  selectTeam1Player1(player: Player): AddMatchPage {
    cy.get('#team1-player-input-0').select(player.name)
    return this
  }

  selectTeam2Player1(player: Player): AddMatchPage {
    cy.get('#team2-player-input-0').select(player.name)
    return this
  }

  team1Wins(): DashboardPage {
    cy.get('#team1-win-button').click()
    return new DashboardPage(this.gameName)
  }
}

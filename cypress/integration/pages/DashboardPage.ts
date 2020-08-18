import { Page } from './Page'
import { SelectGamePage } from './SelectGamePage'
import { AddMatchPage } from './AddMatchPage'
import { MatchListPage } from './MatchListPage'
import { LeaderboardPage } from './LeaderboardPage'

export class DashboardPage extends Page {
  constructor(private gameName: string) {
    super(`/${gameName}`)
  }

  visit(): DashboardPage {
    super.visit()
    return this
  }

  locate(): void {
    super.locate()
    this.getContent()
      .should('contain.text', 'Last Battles')
      .should('contain.text', 'Top Rating')
    this.getHeader()
      .should('contain.text', 'Add Match')
  }

  goToAddMatch(): AddMatchPage {
    cy.get('#add-match-button').click()
    return new AddMatchPage(this.gameName)
  }

  goToGameSelection(): SelectGamePage {
    this.getHeader().get('#logo').click()
    return new SelectGamePage()
  }

  goToMatchesList(): MatchListPage {
    this.getContent().get('#show-all-matches').click()
    return new MatchListPage(this.gameName)
  }

  goToLeaderboard(): LeaderboardPage {
    this.getContent().get('#show-leaderboard').click()
    return new LeaderboardPage(this.gameName)
  }
}

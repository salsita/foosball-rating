import { Page } from './Page'
import { SelectGamePage } from './SelectGamePage'
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

  goToGameSelection(): SelectGamePage {
    this.getHeader().get('#logo').click()
    return new SelectGamePage()
  }

  goToLeaderboard(): LeaderboardPage {
    this.getContent().get('#show-leaderboard').click()
    return new LeaderboardPage(this.gameName)
  }
}

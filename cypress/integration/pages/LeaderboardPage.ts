import { Page } from './Page'
import { Player } from '../types/Player'
import { DashboardPage } from './DashboardPage'

export class LeaderboardPage extends Page {
  constructor(private gameName: string) {
    super(`/${gameName}/leaderboard`)
  }

  locatePlayerWithScore(player: Player, score: number): LeaderboardPage {
    this.getContent().should('contain.text', `${player.name} (${score})`)
    return this
  }
  missPlayerWithScore(player: Player, score: number): LeaderboardPage {
    this.getContent().should('not.contain.text', `${player.name} (${score})`)
    return this
  }

  goToDashboard(): DashboardPage {
    this.getHeader().get('#title-link').click()
    return new DashboardPage(this.gameName)
  }
}

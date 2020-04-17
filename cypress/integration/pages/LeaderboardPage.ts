import { Page } from './Page'
import { Player } from '../types/Player'

export class LeaderboardPage extends Page {
  constructor(private gameName: string) {
    super(`/${gameName}/leaderboard`)
  }

  locatePlayerWithScore(player: Player, score: number): void {
    this.getContent().should('contain.text', `${player.name} (${score})`)
  }
  missPlayerWithScore(player: Player, score: number): void {
    this.getContent().should('not.contain.text', `${player.name} (${score})`)
  }
}

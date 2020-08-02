import { Player } from '../types/Player'

export class MatchRecord {
  constructor(private count: number) {}

  locateWonPlayer(player: Player): MatchRecord {
    cy.get(`#battle-history > :nth-child(${this.count})`).find('a').first().contains(player.name)
    return this
  }

  locateLostPlayer(player: Player): MatchRecord {
    cy.get(`#battle-history > :nth-child(${this.count})`).find('a').last().contains(player.name)
    return this
  }
}

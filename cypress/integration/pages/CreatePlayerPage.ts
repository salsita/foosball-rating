import { Page } from './Page'
import { SelectGamePage } from './SelectGamePage'
import { Player } from '../types/Player'

export class CreatePlayerPage extends Page {
  constructor(gameName: string) {
    super(`/${gameName}/add-player`)
  }

  visit(): CreatePlayerPage {
    super.visit()
    return this
  }

  goToSelectGamePage(): SelectGamePage {
    this.getHeader().get('#logo').click()
    return new SelectGamePage()
  }

  addPlayer(player: Player, score: number): CreatePlayerPage {
    const content = this.getContent()
    content.get('#player-name-input').clear().type(player.name)
    content
      .get('#player-rating-input')
      .focus()
      .type('{selectall}')
      .type(score.toString())
    content.get('#add-player-button').click()
    return this
  }
}

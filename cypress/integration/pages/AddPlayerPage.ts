import { Page } from './Page'
import { SelectGamePage } from './SelectGamePage'
import { Player } from '../types/Player'
import { DashboardPage } from './DashboardPage'

export class AddPlayerPage extends Page {
  constructor(private gameName: string) {
    super(`/${gameName}/add-player`)
  }

  visit(): AddPlayerPage {
    super.visit()
    return this
  }

  goToSelectGamePage(): SelectGamePage {
    this.getHeader().get('#logo').click()
    return new SelectGamePage()
  }

  goToDashboard(): DashboardPage {
    this.getHeader().get('#title-link').click()
    return new DashboardPage(this.gameName)
  }

  addPlayer(player: Player, score: number): AddPlayerPage {
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

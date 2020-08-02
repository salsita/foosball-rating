import { Page } from './Page'
import { MatchRecord } from '../components/MatchRecord'
import { DashboardPage } from './DashboardPage'

export class MatchListPage extends Page {
  constructor(private gameName: string) {
    super(`/${gameName}/match-list`)
  }

  getLastMatch(): MatchRecord {
    return new MatchRecord(1)
  }

  goToDashboard(): DashboardPage {
    this.getHeader().get('#title-link').click()
    return new DashboardPage(this.gameName)
  }
}

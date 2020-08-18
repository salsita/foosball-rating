import { Page } from './Page'

export class MatchListPage extends Page {
  constructor(private gameName: string) {
    super(`/${gameName}/match-list`)
  }
}

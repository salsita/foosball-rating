import { AddMatchPage } from '../pages/AddMatchPage'
import { FOOSBALL_GAME } from '../utils/data'
import { AddPlayerPage } from '../pages/AddPlayerPage'
import { generateRandomPlayer } from '../utils/gen'
import { DashboardPage } from '../pages/DashboardPage'

describe('Create match page', () => {
  const addMatchPage = new AddMatchPage(FOOSBALL_GAME.name)
  before(() => {
    addMatchPage.visit()
  })
  it('renders', () => {
    addMatchPage.locate()
  })
})

describe('Foosball', () => {
  const player1 = generateRandomPlayer()
  const player1score = 1010
  const player1newscore= 1026
  const player2 = generateRandomPlayer()
  const player2score = 1020
  const player2newscore= 1004
  describe('when player 1 and player 2 exist in foosball and first wins once over second', () => {
    let dashboard: DashboardPage
    before(() => {
      dashboard = new DashboardPage(FOOSBALL_GAME.name).visit()
    })
    before(() => {
      dashboard = new AddPlayerPage(FOOSBALL_GAME.name)
        .visit()
        .addPlayer(player1, player1score)
        .addPlayer(player2, player2score)
        .goToSelectGamePage()
        .selectGame(FOOSBALL_GAME.name)
        .goToAddMatch()
        .selectTeam1Player1(player1)
        .selectTeam2Player1(player2)
        .team1Wins()
    })
    it('contains players with resulting scores in leaderboard', () => {
      dashboard = dashboard.goToLeaderboard()
        .locatePlayerWithScore(player1, player1newscore)
        .locatePlayerWithScore(player2, player2newscore)
        .goToDashboard()
    })
    it('contains a match record in dashboard', () => {
      dashboard.getLastMatch()
        .locateWonPlayer(player1)
        .locateLostPlayer(player2)
    })
    it('contains a match record in the matches list', () => {
      const matchesList = dashboard.goToMatchesList()
      matchesList
        .getLastMatch()
        .locateWonPlayer(player1)
        .locateLostPlayer(player2)
      matchesList
        .goToDashboard()
    })
  })
})

import { CreatePlayerPage } from '../pages/CreatePlayerPage'
import { FOOSBALL_GAME } from '../utils/data'
import { Player } from '../types/Player'
import { generateRandomPlayer } from '../utils/gen'

describe('Create player page', () => {
  const addPlayerPage = new CreatePlayerPage(FOOSBALL_GAME.name)
  before(() => {
    addPlayerPage.visit()
  })
  it('renders', () => {
    addPlayerPage.locate()
  })
  describe('when a random player is added to foosball', () => {
    let player: Player
    const score = 1001
    beforeEach(() => {
      player = generateRandomPlayer()
      addPlayerPage.addPlayer(player, score)
    })
    it('is seen in the leaderboard without reload', () => {
      const leaderboard = addPlayerPage
        .goToSelectGamePage()
        .selectGame(FOOSBALL_GAME.name)
        .goToLeaderboard()
      leaderboard.locatePlayerWithScore(player, score)
    })
  })
})

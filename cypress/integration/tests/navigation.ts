import { SelectGamePage } from '../pages/SelectGamePage'
import { FOOSBALL_GAME, TENNIS_GAME } from '../utils/data'

describe('Navigation', () => {
  describe('foosball dashboard', () => {
    it('is reachable', () => {
      new SelectGamePage()
        .visit()
        .selectGame(FOOSBALL_GAME.name)
        .locate()
    })
  })

  describe('foosball add match page', () => {
    it('is reachable', () => {
      new SelectGamePage()
        .visit()
        .selectGame(FOOSBALL_GAME.name)
        .goToAddMatch()
        .locate()
    })
  })

  describe('tennis dashboard after foosball dashboard', () => {
    it('is reachable', () => {
      new SelectGamePage()
        .visit()
        .selectGame(FOOSBALL_GAME.name)
        .goToGameSelection()
        .selectGame(TENNIS_GAME.name)
        .locate()
    })
  })

  describe('match list page', () => {
    it('is reachable', () => {
      new SelectGamePage()
        .visit()
        .selectGame(FOOSBALL_GAME.name)
        .goToMatchesList()
        .locate()
    })
  })
  describe('leaderboard page', () => {
    it('is reachable', () => {
      new SelectGamePage()
        .visit()
        .selectGame(FOOSBALL_GAME.name)
        .goToLeaderboard()
        .locate()
    })
  })
})

import { AddPlayerPage } from '../pages/AddPlayerPage'
import { FOOSBALL_GAME, TENNIS_GAME } from '../utils/data'
import { Player } from '../types/Player'
import { generateRandomPlayer } from '../utils/gen'

describe('Add player page', () => {
  const addPlayerPage = new AddPlayerPage(FOOSBALL_GAME.name)
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
        .goToDashboard()
        .goToLeaderboard()
      leaderboard.locatePlayerWithScore(player, score)
    })
  })
})

describe('A player added to foosball is not added to tennis', () => {
  const addPlayerPage = new AddPlayerPage(FOOSBALL_GAME.name)
  describe('when a player is added to foosball', () => {
    let player: Player
    const score = 1001
    beforeEach(() => {
      player = generateRandomPlayer()
      addPlayerPage
        .visit()
        .addPlayer(player, score)
    })
    it('is not added to tennis', () => {
      addPlayerPage
        .goToSelectGamePage()
        .selectGame(TENNIS_GAME.name)
        .goToLeaderboard()
        .missPlayerWithScore(player, score)
    })
  })
})

describe('Same player can be added to foosball and to tennis', () => {
  describe('when a player is added to foosball', () => {
    let player: Player
    const score = 1001
    beforeEach(() => {
      player = generateRandomPlayer()
      new AddPlayerPage(FOOSBALL_GAME.name)
        .visit()
        .addPlayer(player, score)
    })
    it('can be added to tennis', () => {
      new AddPlayerPage(TENNIS_GAME.name)
        .visit()
        .addPlayer(player, score)
        .goToSelectGamePage()
        .selectGame(TENNIS_GAME.name)
        .goToLeaderboard()
        .locatePlayerWithScore(player, score)
    })
  })
})

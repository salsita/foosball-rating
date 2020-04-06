import { createActions } from 'reduxsauce'

export const GamesActions = createActions({
  gamesLoaded: ['games'],
  selectGame: ['selectedGame'],
  selectGameByName: ['gameName'],
  notFoundGame: ['gameName'],
  refreshGameById: ['gameId'],
  deselectGame: [],
}, {
  prefix: 'foosball-rating/games/',
})

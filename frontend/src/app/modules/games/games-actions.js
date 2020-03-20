import { createActions } from 'reduxsauce'

export const GamesActions = createActions({
  gamesLoaded: ['games'],
  selectGame: ['selectedGame'],
  selectGameByName: ['gameName'],
  refreshGameById: ['gameId'],
  notFoundGame: ['gameName'],
  deselectGame: [],
}, {
  prefix: 'foosball-rating/games/',
})

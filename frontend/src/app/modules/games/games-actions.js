import { createActions } from 'reduxsauce'

export const GamesActions = createActions({
  gamesLoaded: ['games'],
  selectGame: ['selectedGame'],
  selectGameByName: ['gameName'],
  selectionFailed: [],
  refreshGameById: ['gameId'],
  deselectGame: [],
}, {
  prefix: 'foosball-rating/games/',
})

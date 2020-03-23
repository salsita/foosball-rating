import { createActions } from 'reduxsauce'

export const GamesActions = createActions({
  gamesLoaded: ['games'],
  selectGame: ['selectedGame'],
  refreshGameById: ['gameId'],
}, {
  prefix: 'foosball-rating/games/',
})

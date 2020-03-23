import { createActions } from 'reduxsauce'

export const GamesActions = createActions({
  gamesLoaded: ['games'],
  selectGame: ['selectedGame'],
}, {
  prefix: 'foosball-rating/games/',
})

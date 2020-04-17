import { createActions } from 'reduxsauce'

export const PlayersActions = createActions({
  updateStatus: ['status'],
  addPlayer: ['player'],
  playersLoaded: ['players'],
  playerAdded: [],
}, {
  prefix: 'foosball-rating/players/',
})

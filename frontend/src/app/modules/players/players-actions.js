import { createActions } from 'reduxsauce'

export const PlayersActions = createActions({
  updateStatus: ['status'],
  addPlayer: ['player'],
  playersLoaded: ['players'],
}, {
  prefix: 'foosball-rating/players/',
})

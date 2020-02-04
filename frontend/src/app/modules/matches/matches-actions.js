import { createActions } from 'reduxsauce'

export const MatchesActions = createActions({
  updateStatus: ['status'],
  addMatch: ['match'],
  matchesLoaded: ['matches'],
}, {
  prefix: 'foosball-rating/matches/',
})

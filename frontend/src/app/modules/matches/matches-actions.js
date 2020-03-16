import { createActions } from 'reduxsauce'

export const MatchesActions = createActions({
  updateStatus: ['status'],
  addMatch: ['match'],
  matchesLoaded: ['matches'],
  matchAdded: ['match'],
}, {
  prefix: 'foosball-rating/matches/',
})

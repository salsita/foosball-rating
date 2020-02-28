import { createActions } from 'reduxsauce'

export const LeaderboardActions = createActions({
  updateCriteria: ['criteria'],
  updateOrder: ['order'],
  updateTimespan: ['timespan'],
}, {
  prefix: 'foosball-rating/leaderboard/',
})

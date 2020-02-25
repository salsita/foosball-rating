import { createActions } from 'reduxsauce'

export const LeaderboardsActions = createActions({
  updateCriteria: ['criteria'],
  updateOrder: ['order'],
  updateTimespan: ['timespan'],
}, {
  prefix: 'foosball-rating/leaderboards/',
})

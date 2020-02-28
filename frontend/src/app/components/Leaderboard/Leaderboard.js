import React from 'react'
import { connect } from 'react-redux'

import { ListCon } from '../../../styles/blocks'
import { LeaderboardRow } from './LeaderboardRow'
import { LeaderboardFilters } from './LeaderboardFilters'
import { getTopUsers } from '../../modules/users/users-selectors'
import { LeaderboardActions } from '../../modules/leaderboard/leaderboard-actions'
import * as Filters from '../../const/leaderboard-filters'

const LeaderboardComponent = (
  { topUsers, filters, maxItems, showFilters, updateCriteria, updateOrder, updateTimespan }
) =>
  (
  <>
    {showFilters
      ? <LeaderboardFilters filters={filters} updateCriteria={updateCriteria}
        updateOrder={updateOrder} updateTimespan={updateTimespan}/>
      : ''}

    <ListCon className="topPlayers" ascending={filters.order === Filters.orderTypes.ASC}>
      {topUsers.slice(0, maxItems).map((user, index) =>
        <LeaderboardRow key={user.id} user={user}
          position={filters.order === Filters.orderTypes.ASC ? topUsers.length - index : index + 1}
          points={getUserPoints(user, filters.criteria)} />,
      )}
    </ListCon>
  </>
  )

const getUserPoints = (user, criteria) => {
  switch (criteria) {
    case Filters.criteriaTypes.Wins:
      return user.stats.wins
    case Filters.criteriaTypes.Ratio:
      return (user.stats.winRatio* 100).toFixed(2) + '%'
    case Filters.criteriaTypes.Streak:
      return user.stats.streak
    case Filters.criteriaTypes.Matches:
      return user.stats.matches
    default:
      return user.rating
  }
}

const mapStateToProps = state => ({
  topUsers: getTopUsers(state),
  filters: state.filters,
})

const mapDispatchToProps = dispatch => ({
  updateCriteria: criteria => dispatch(LeaderboardActions.Creators.updateCriteria(criteria)),
  updateOrder: order => dispatch(LeaderboardActions.Creators.updateOrder(order)),
  updateTimespan: timespan => dispatch(LeaderboardActions.Creators.updateTimespan(timespan)),
})

export const Leaderboard = connect(mapStateToProps, mapDispatchToProps)(LeaderboardComponent)

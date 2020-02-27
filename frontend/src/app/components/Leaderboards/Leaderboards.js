import React from 'react'
import { connect } from 'react-redux'

import { ListCon } from '../../../styles/blocks'
import { LeaderboardsRow } from './LeaderboardsRow'
import { LeaderboardsFilters } from './LeaderboardsFilters'
import { getTopUsers } from '../../modules/users/users-selectors'
import { LeaderboardsActions } from '../../modules/leaderboards/leaderboards-actions'
import * as Filters from '../../const/leaderboards-filters'

const LeaderboardsComponent = (
  { topUsers, filters, maxItems, showFilters, updateCriteria, updateOrder, updateTimespan }
) =>
  (
  <>
    {showFilters
      ? <LeaderboardsFilters filters={filters} updateCriteria={updateCriteria}
        updateOrder={updateOrder} updateTimespan={updateTimespan}/>
      : ''}

    <ListCon className="topPlayers" ascending={filters.order === Filters.orderTypes.ASC}>
      {topUsers.slice(0, maxItems).map((user, index) =>
        <LeaderboardsRow key={user.id} user={user}
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
  updateCriteria: criteria => dispatch(LeaderboardsActions.Creators.updateCriteria(criteria)),
  updateOrder: order => dispatch(LeaderboardsActions.Creators.updateOrder(order)),
  updateTimespan: timespan => dispatch(LeaderboardsActions.Creators.updateTimespan(timespan)),
})

export const Leaderboards = connect(mapStateToProps, mapDispatchToProps)(LeaderboardsComponent)

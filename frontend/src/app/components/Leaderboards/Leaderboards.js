import React from 'react'
import { connect } from 'react-redux'

import { ListCon, FiltersBlock, FiltersSpan } from '../../../styles/blocks'
import { LeaderboardsRow } from './LeaderboardsRow'
import { getTopUsers } from '../../modules/users/users-selectors'
import { LeaderboardsActions } from '../../modules/leaderboards/leaderboards-actions'
import * as Filters from '../../const/leaderboards-filters'

const LeaderboardsComponent = (
  { topUsers, filters, maxItems, updateCriteria, updateOrder, updateTimespan }
) =>
  (
  <>
    <FiltersBlock>
      {Object.entries(Filters.criteriaTypes).map(([key, value]) =>
        <FiltersSpan key={key} className={value === filters.criteria ? 'active-filter' : ''}
          onClick={() => updateCriteria(value)}>{key}</FiltersSpan>,
      )}

      {Object.entries(Filters.orderTypes).map(([key, value]) =>
        <FiltersSpan key={key} className={value === filters.order ? 'active-filter' : ''}
          onClick={() => updateOrder(value)}>{value}</FiltersSpan>,
      )}

      {Object.entries(Filters.timespanTypes).map(([key, value]) =>
        <FiltersSpan key={key} className={value === filters.timespan ? 'active-filter' : ''}
          onClick={() => updateTimespan(value)}>{key.split(/(?=[A-Z0-9])/).join(' ')}
        </FiltersSpan>,
      )}
    </FiltersBlock>

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

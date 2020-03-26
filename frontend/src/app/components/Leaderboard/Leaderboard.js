import React from 'react'
import { connect } from 'react-redux'

import { ListCon } from '../../../styles/blocks'
import { LeaderboardRow } from './LeaderboardRow'
import { LeaderboardFilters } from './LeaderboardFilters'
import { getTopPlayers } from '../../modules/players/players-selectors'
import { LeaderboardActions } from '../../modules/leaderboard/leaderboard-actions'
import * as Filters from '../../const/leaderboard-filters'
import { createPlayerWithLink } from '../../modules/players/players-utils'

const LeaderboardComponent = (
  { topPlayers, filters, maxItems, showFilters, updateCriteria, updateOrder, updateTimespan },
) => (
  <>
    {showFilters
      ? <LeaderboardFilters filters={filters} updateCriteria={updateCriteria}
        updateOrder={updateOrder} updateTimespan={updateTimespan}/>
      : ''}

    <ListCon className="topPlayers" ascending={filters.order === Filters.orderTypes.ASC}>
      {topPlayers.slice(0, maxItems).map((player, index) =>
        <LeaderboardRow key={player.id} player={player}
          position={
            filters.order === Filters.orderTypes.ASC ? topPlayers.length - index : index + 1
          }
          points={player.criteriaPoints} />,
      )}
    </ListCon>
  </>
)

const mapStateToProps = (state, { constructUrl }) => ({
  topPlayers: getTopPlayers(state).map(player => createPlayerWithLink(player, constructUrl)),
  filters: state.filters,
})

const mapDispatchToProps = dispatch => ({
  updateCriteria: criteria => dispatch(LeaderboardActions.Creators.updateCriteria(criteria)),
  updateOrder: order => dispatch(LeaderboardActions.Creators.updateOrder(order)),
  updateTimespan: timespan => dispatch(LeaderboardActions.Creators.updateTimespan(timespan)),
})

export const Leaderboard = connect(mapStateToProps, mapDispatchToProps)(LeaderboardComponent)

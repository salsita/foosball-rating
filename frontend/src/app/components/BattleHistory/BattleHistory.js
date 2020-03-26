import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ListCon,
} from '../../../styles/blocks'
import { BattleHistoryRow } from './BattleHistoryRow'

import { getLastMatches } from '../../modules/matches/matches-selectors'
import { createMatchWithPlayerLinks } from '../../modules/matches/matches-utils'

class BattleHistoryComponent extends Component {
  render() {
    return (
      <ListCon>
        {this.props.lastMatches.slice(0, this.props.maxItems).map(match =>
          <BattleHistoryRow key={match.id} match={match} />,
        )}
      </ListCon>
    )
  }
}

const mapStateToProps = (state, { constructUrl }) => ({
  lastMatches: getLastMatches(state).map(match => createMatchWithPlayerLinks(match, constructUrl)),
})

export const BattleHistory = connect(mapStateToProps)(BattleHistoryComponent)

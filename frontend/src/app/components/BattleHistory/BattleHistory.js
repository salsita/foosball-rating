import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ListCon,
} from '../../../styles/blocks'
import { BattleHistoryRow } from './BattleHistoryRow'

export class BattleHistory extends Component {
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

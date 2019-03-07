import React, { Component } from 'react'
import { connect } from "react-redux"
import {
  ListCon,
} from '../../../styles/blocks';
import BattleHistoryRow from './BattleHistoryRow'

import { getLastMatches } from '../../modules/matches/matches-selectors'


class BattleHistory extends Component {
  constructor() {
    super();
  }
  
  render() {
    return(
      <ListCon>
        {this.props.lastMatches.map((match) => 
          <BattleHistoryRow match={match}/>
        )}
      </ListCon>
    )
  }
}

const mapStateToProps = state => ({
  lastMatches: getLastMatches(state)
})

const SmartBattleHistory = connect(mapStateToProps)(BattleHistory)

export default SmartBattleHistory;

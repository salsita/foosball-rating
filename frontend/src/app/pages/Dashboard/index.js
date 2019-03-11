import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
  Subtitle,
  Button
} from './../../../styles/blocks';
import { BattleHistory } from './../../components/BattleHistory/BattleHistory';
import { TopRating } from '../../components/TopRatings/TopRating';
import { CreateMatchStatus } from '../../components/CreateMatch/CreateMatchStatus';

class DashboardComponent extends Component {
  render() {
    return(
      <>
        <Button>Add Match</Button>
        <CreateMatchStatus status={this.props.createMatchStatus} />
        <Subtitle textAlign="center">Last Battles</Subtitle>
        <BattleHistory maxItems={5} />
        <Subtitle textAlign="center">Top Rating</Subtitle>
        <TopRating maxItems={5} />
      </>
    )
  }
}

const mapStateToProps = state => ({
  createMatchStatus: state.matches.status
})

export const Dashboard = connect(mapStateToProps)(DashboardComponent)

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { 
  Subtitle,
  Button
} from './../../../styles/blocks';
import { BattleHistory } from './../../components/BattleHistory/BattleHistory';
import { TopRating } from '../../components/TopRatings/TopRating';
import { CREATE_MATCH, MATCH_LIST, USER_LIST } from '../../const/routes'
import { SnackbarAlert } from '../../components/CreateMatch/SnackbarAlert';

class DashboardComponent extends Component {
  createMatch = () => {
    this.props.history.push(CREATE_MATCH)
  }

  render() {
    return(
      <>
        <Button onClick={this.createMatch}>Add Match</Button>
        <SnackbarAlert />
        <Subtitle textAlign="center">Last Battles</Subtitle>
        <BattleHistory maxItems={5} />
        <Link to={MATCH_LIST}>Show all...</Link>
        <Subtitle textAlign="center">Top Rating</Subtitle>
        <TopRating maxItems={5} />
        <Link to={USER_LIST}>Show all...</Link>
      </>
    )
  }
}

const mapStateToProps = state => ({
  createMatchStatus: state.matchesStatus
})

const RoutingDashboardComponent = withRouter(DashboardComponent)

export const Dashboard = connect(mapStateToProps)(RoutingDashboardComponent)

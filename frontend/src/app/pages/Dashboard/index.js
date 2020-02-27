import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Box,
  Subtitle,
  StyledLink,
} from './../../../styles/blocks'
import { BattleHistory } from './../../components/BattleHistory/BattleHistory'
import { Leaderboards } from '../../components/Leaderboards/Leaderboards'
import { MATCH_LIST, LEADERBOARDS } from '../../const/routes'
import { SnackbarAlert } from '../../components/SnackbarAlert/SnackbarAlert'

class DashboardComponent extends Component {

  render() {
    return (
      <Box Margin="10px" Padding="10px">
        <SnackbarAlert />
        <Subtitle textAlign="center">Last Battles</Subtitle>
        <BattleHistory maxItems={5} />
        <StyledLink to={MATCH_LIST}>Show all...</StyledLink>
        <Subtitle textAlign="center">Top Rating</Subtitle>
        <Leaderboards maxItems={5} showFilters={false} />
        <StyledLink to={LEADERBOARDS}>Show more...</StyledLink>
      </Box>
    )
  }
}

const mapStateToProps = state => ({
  createMatchStatus: state.matchesStatus,
})

const RoutingDashboardComponent = withRouter(DashboardComponent)

export const Dashboard = connect(mapStateToProps)(RoutingDashboardComponent)

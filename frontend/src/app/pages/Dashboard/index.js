import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Box,
  Subtitle,
  StyledLink,
} from './../../../styles/blocks'
import { BattleHistory } from './../../components/BattleHistory/BattleHistory'
import { Leaderboard } from '../../components/Leaderboard/Leaderboard'
import { MATCH_LIST, LEADERBOARD } from '../../const/routes'
import { SnackbarAlert } from '../../components/SnackbarAlert/SnackbarAlert'
import { getLastMatches } from '../../modules/matches/matches-selectors'
import { withPlayerLinks } from '../../modules/matches/matches-utils'
import { getTopPlayers } from '../../modules/players/players-selectors'
import { withLinks } from '../../modules/players/players-utils'

const DashboardComponent = ({ lastMatches, topPlayers, constructUrl }) =>
  <Box id="dashboard" Margin="10px" Padding="10px">
    <SnackbarAlert />
    <Subtitle textAlign="center">Last Battles</Subtitle>
    <BattleHistory lastMatches={lastMatches} maxItems={5} />
    <StyledLink id="show-all-matches" to={constructUrl(MATCH_LIST)}>Show all...</StyledLink>
    <Subtitle textAlign="center">Top Rating</Subtitle>
    <Leaderboard topPlayers={topPlayers} maxItems={5} showFilters={false} />
    <StyledLink id="show-leaderboard" to={constructUrl(LEADERBOARD)}>Show more...</StyledLink>
  </Box>


const mapStateToProps = (state, { constructUrl }) => ({
  createMatchStatus: state.matchesStatus,
  lastMatches: withPlayerLinks(getLastMatches(state), constructUrl),
  topPlayers: withLinks(getTopPlayers(state), constructUrl),
})

const RoutingDashboardComponent = withRouter(DashboardComponent)

export const Dashboard = connect(mapStateToProps)(RoutingDashboardComponent)

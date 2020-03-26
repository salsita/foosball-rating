import React from 'react'

import { Leaderboard } from '../../components/Leaderboard/Leaderboard'
import { Subtitle, Box } from './../../../styles/blocks'
import { connect } from 'react-redux'
import { getTopPlayers } from '../../modules/players/players-selectors'
import { createPlayerWithLink } from '../../modules/players/players-utils'

export const LeaderboardPageComponent = ({ topPlayers }) =>
  <Box Margin="10px" Padding="10px">
    <Subtitle textAlign="center">Hall of Fame</Subtitle>
    <Leaderboard topPlayers={topPlayers} maxItems={Number.MAX_SAFE_INTEGER} showFilters={true}/>
  </Box>

const mapStateToProps = (state, { constructUrl }) => ({
  topPlayers: getTopPlayers(state).map(player => createPlayerWithLink(player, constructUrl)),
})

export const LeaderboardPage = connect(mapStateToProps)(LeaderboardPageComponent)

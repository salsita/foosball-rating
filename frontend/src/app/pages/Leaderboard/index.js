import React from 'react'
import { Leaderboard } from '../../components/Leaderboard/Leaderboard'
import { Subtitle, Box } from './../../../styles/blocks'
import { connect } from 'react-redux'
import { getTopPlayers, getKing } from '../../modules/players/players-selectors'
import { withLinks } from '../../modules/players/players-utils'

const LeaderboardPageComponent = ({ topPlayers, king }) =>
  <Box Margin="10px" Padding="10px">
    <Subtitle textAlign="center">Hall of Fame</Subtitle>
    <Leaderboard
      topPlayers={topPlayers}
      king={king}
      maxItems={Number.MAX_SAFE_INTEGER}
      showFilters={true} />
  </Box>

const mapStateToProps = (state, { constructUrl }) => ({
  topPlayers: withLinks(getTopPlayers(state), constructUrl),
  king: getKing(state),
})

export const LeaderboardPage = connect(mapStateToProps)(LeaderboardPageComponent)

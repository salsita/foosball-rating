import React from 'react'

import { Leaderboard } from '../../components/Leaderboard/Leaderboard'
import { Subtitle, Box } from './../../../styles/blocks'

export const LeaderboardPage = () =>
  <Box Margin="10px" Padding="10px">
    <Subtitle textAlign="center">Hall of Fame</Subtitle>
    <Leaderboard maxItems={Number.MAX_SAFE_INTEGER} showFilters={true} />
  </Box>

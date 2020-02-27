import React from 'react'

import { Leaderboards } from '../../components/Leaderboards/Leaderboards'
import { Subtitle, Box } from './../../../styles/blocks'

export const LeaderboardsPage = () =>
  <Box Margin="10px" Padding="10px">
    <Subtitle textAlign="center">Hall of Fame</Subtitle>
    <Leaderboards maxItems={Number.MAX_SAFE_INTEGER} showFilters={true} />
  </Box>

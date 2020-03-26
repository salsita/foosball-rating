import React from 'react'
import { BattleHistory } from '../../components/BattleHistory/BattleHistory'
import { Subtitle, Box } from './../../../styles/blocks'

export const MatchListPage = ({ constructUrl }) =>
  <>
    <Box Margin="10px" Padding="10px">
      <Subtitle textAlign="center">Last Battles</Subtitle>
      <BattleHistory constructUrl={constructUrl} maxItems={Number.MAX_SAFE_INTEGER} />
    </Box>
  </>

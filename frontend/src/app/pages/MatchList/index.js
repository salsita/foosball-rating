import React from 'react'
import { BattleHistory } from '../../components/BattleHistory/BattleHistory';
import { Subtitle, Box } from './../../../styles/blocks';

export const MatchListPage = () => 
<>
  <Box Padding="10px">
    <Subtitle textAlign="center">Last Battles</Subtitle>
    <BattleHistory maxItems={Number.MAX_SAFE_INTEGER}/>
  </Box>
</>

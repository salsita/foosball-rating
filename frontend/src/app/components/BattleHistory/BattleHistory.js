import React from 'react'
import {
  ListCon,
} from '../../../styles/blocks'
import { BattleHistoryRow } from './BattleHistoryRow'

export const BattleHistory = ({ maxItems, lastMatches }) =>
  <ListCon>
    {lastMatches.slice(0, maxItems).map(match =>
      <BattleHistoryRow key={match.id} match={match} />,
    )}
  </ListCon>

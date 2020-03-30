import React from 'react'
import {
  BattleLabel,
  ListItem,
} from '../../../styles/blocks'
import { Team } from './Team'

export const BattleHistoryRow = ({ match }) =>
  <ListItem Display="grid" Column="2fr 1fr 2fr">
    <Team team={match.team1} didWin={match.team1Won} />
    <BattleLabel textAlign="center">VS</BattleLabel>
    <Team team={match.team2} didWin={!match.team1Won} />
  </ListItem>

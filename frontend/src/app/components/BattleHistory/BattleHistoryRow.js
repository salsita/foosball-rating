import React from 'react';
import {
  TextSpan,
  ListItem,
  ALink,
} from '../../../styles/blocks';
import Team from './Team';
import cx from 'classnames';

const BattleHistoryRow = ({ match }) => (
  <ListItem Display="grid" Column="2fr 1fr 2fr">
    <Team team={match.team1}/>
    <TextSpan textAlign="center">VS</TextSpan>
    <Team team={match.team2}/>
  </ListItem>
)



export default BattleHistoryRow;

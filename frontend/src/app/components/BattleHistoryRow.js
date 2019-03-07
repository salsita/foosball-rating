import React, { Component } from 'react';

import {
  Title, Subtitle, TextSpan,
  ListCon, ListItem,
  ALink,
  GridContainer
} from './../../styles/blocks/';

const BattleHistoryRow = ({ match }) => (
  <ListItem Display="grid" Collumn="2fr 1fr 2fr">
  <TextSpan textAlign="right">
    <ALink>{match.team1.name1}</ALink>
    &
    <ALink>{match.team1.name2}</ALink>
  </TextSpan>
  <TextSpan textAlign="center">VS</TextSpan>
  <TextSpan textAlign="left">
    <ALink>{match.team2.name1}</ALink>
    & 
    <ALink>{match.team2.name2}</ALink>
  </TextSpan>
  </ListItem>
)

export default BattleHistoryRow;

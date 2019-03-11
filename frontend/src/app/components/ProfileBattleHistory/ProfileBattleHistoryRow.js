import React from 'react';
import { ListItem, TextSpan } from './../../../styles/blocks';

export const ProfileBattleHistoryRow = ({ match }) => (
  <ListItem>
    <TextSpan>{match.date.toLocaleDateString()}</TextSpan>
    <TextSpan>{match.ratingChangeString}</TextSpan>
  </ListItem>
)

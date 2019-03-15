import React from 'react';
import { ListItem, WinnerSpan, TextSpan } from './../../../styles/blocks';

export const ProfileBattleHistoryRow = ({ match }) => (
  <ListItem>
    <TextSpan>{match.date.toLocaleDateString()}</TextSpan>
    <WinnerSpan winner={match.didWin}>{match.ratingChangeString}</WinnerSpan>
  </ListItem>
)

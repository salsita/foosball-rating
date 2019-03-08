import React from 'react';
import {
  WinnerSpan,
  ALink,
} from '../../../styles/blocks';

const createListFromTeam = (team) => team
  .map(player => <ALink>{player.name} ({player.matchRating})</ALink>)
  // Works only for 2 elements at maximum!
  .reduce((prev, curr) => [prev, "&", curr])

const Team = ({ team, didWin }) => (
  <WinnerSpan winner={didWin}>
    {createListFromTeam(team)}
  </WinnerSpan>
)

export default Team;

import React from 'react';
import {
  WinnerSpan,
  ALink,
} from '../../../styles/blocks';

const createListFromTeam = (team) => team
  .map(player => [<ALink>{player.name} <span>({player.matchRating})</span></ALink>])
  .reduce((prev, curr) => [...prev, "&", ...curr])

const Team = ({ team, didWin }) => (
  <WinnerSpan winner={didWin}>
    {createListFromTeam(team)}
  </WinnerSpan>
)

export default Team;

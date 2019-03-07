import React from 'react';
import {
  WinnerSpan,
  ListItem,
  ALink,
} from '../../../styles/blocks';
import cx from 'classnames';

const createListFromTeam = (team) => team
  .map(player => <ALink>{player.name} ({player.matchRating})</ALink>)
  // Works only for 2 elements at maximum!
  .reduce((prev, curr) => [prev, "&", curr])

const Team = ({ team }) => (
  <WinnerSpan winner={team.winner}>
    {createListFromTeam(team)}
  </WinnerSpan>
)

export default Team;

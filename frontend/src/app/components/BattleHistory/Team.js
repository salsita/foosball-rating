import React from 'react';
import { Link } from 'react-router-dom'
import {
  WinnerSpan,
  StyledLink
} from '../../../styles/blocks';
import { createProfilePath } from '../../const/routes';

const createListFromTeam = (team) => team
  .map((player, index) => [<StyledLink key={index} to={createProfilePath(player.id)}>{player.name} <span>({player.matchRating})</span></StyledLink>])
  .reduce((prev, curr) => [...prev, "&", ...curr])

const Team = ({ team, didWin }) => (
  <WinnerSpan winner={didWin}>
    {createListFromTeam(team)}
  </WinnerSpan>
)

export default Team;

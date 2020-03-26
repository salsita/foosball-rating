import React from 'react'
import {
  WinnerSpan,
  StyledLink,
} from '../../../styles/blocks'

const createListFromTeam = team => team
  .map((player, index) => [<StyledLink key={index} to={player.link}>{player.name}
    <span>({player.matchRating})</span></StyledLink>])
  .reduce((prev, curr) => [...prev, '&', ...curr])

export const Team = ({ team, didWin }) => (
  <WinnerSpan winner={didWin}>
    {createListFromTeam(team)}
  </WinnerSpan>
)

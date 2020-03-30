import React from 'react'
import { TextSpan, TextDiv, ListItem, StyledLink } from '../../../styles/blocks'

const trophies = [
  require('../../../media/trophy-1.svg'),
  require('../../../media/trophy-2.svg'),
  require('../../../media/trophy-3.svg'),
]

export const LeaderboardRow = ({ player, position, points }) => (
  <ListItem>
    <TextSpan align="left">{
      position > 3 ? (position + '.') : <img src={trophies[position - 1]} />
    }</TextSpan>
    <TextDiv>
      <StyledLink to={player.link}>{player.name} ({points})</StyledLink>
    </TextDiv>
  </ListItem>
)

import React from 'react'
import { TextSpan, KingSpan, TextDiv, ListItem, StyledLink } from '../../../styles/blocks'
import { createProfilePath } from '../../const/routes'

const trophies = [
  require('../../../media/trophy-1.svg'),
  require('../../../media/trophy-2.svg'),
  require('../../../media/trophy-3.svg'),
]

export const LeaderboardRow = ({ player, king, position, points }) => (
  <ListItem>
    <TextSpan align="left">{
      position > 3 ? (position + '.') : <img src={trophies[position - 1]} alt={`cup${position}`} />
    }</TextSpan>
    {king && king.id === player.id
      ? <KingSpan>King of The Hill<br/>since {king.since.toLocaleDateString()}</KingSpan>
      : ''}
    <TextDiv>
      <StyledLink to={player.link}>{player.name} ({points})</StyledLink>
    </TextDiv>
  </ListItem>
)

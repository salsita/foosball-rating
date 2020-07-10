import React from 'react'
import { PositionDiv, KingDiv, TextSpan, ListItem, StyledLink } from '../../../styles/blocks'

const trophies = [
  require('../../../media/trophy-1.svg'),
  require('../../../media/trophy-2.svg'),
  require('../../../media/trophy-3.svg'),
]

export const LeaderboardRow = ({ player, king, position, points }) => (
  <ListItem display="grid" column="0fr 1fr 2fr">
    <TextSpan align="left">{
      position > 3 ? (position + '.') : <img src={trophies[position - 1]} alt={`cup${position}`} />
    }</TextSpan>
    {king && king.id === player.id
      ? <KingDiv>King of The Hill<br/>since {king.since.toLocaleDateString()}</KingDiv>
      : ''}
    <PositionDiv>
      <StyledLink to={player.link}>{player.name} ({points})</StyledLink>
    </PositionDiv>
  </ListItem>
)

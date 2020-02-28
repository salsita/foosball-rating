import React from 'react'
import { TextSpan, TextDiv, ListItem, StyledLink } from '../../../styles/blocks'
import { createProfilePath } from '../../const/routes'

const trophies = [
  require('../../../media/trophy-1.svg'),
  require('../../../media/trophy-2.svg'),
  require('../../../media/trophy-3.svg'),
]

export const LeaderboardRow = ({ user, position, points }) => (
  <ListItem>
    <TextSpan align="left">{
      position > 3 ? (position + '.') : <img src={trophies[position - 1]} />
    }</TextSpan>
    <TextDiv>
      <StyledLink to={createProfilePath(user.id)}>{user.name} ({points})</StyledLink>
    </TextDiv>
  </ListItem>
)

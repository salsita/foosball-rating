import React from 'react'
import { withRouter } from 'react-router-dom'
import {
  TextSpan,
  ListItem,
  StyledLink,
} from '../../../styles/blocks'
import { createProfilePath } from '../../const/routes'

const trophies = [
  require('../../../media/trophy-1.svg'),
  require('../../../media/trophy-2.svg'),
  require('../../../media/trophy-3.svg'),
]

const LeaderboardsRowComponent = ({ user, position, points }) => (
  <ListItem>
    <TextSpan align="left">{
      position > 3 ? (position + '.') : <img src={trophies[position - 1]} />
    }</TextSpan>
    <TextSpan textAlign="right">
      <StyledLink to={createProfilePath(user.id)}>{user.name} ({points})</StyledLink>
    </TextSpan>
  </ListItem>
)

export const LeaderboardsRow = withRouter(LeaderboardsRowComponent)

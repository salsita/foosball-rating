import React from 'react'
import {
  TextSpan,
  ListItem,
  StyledLink,
} from '../../../styles/blocks'
import { createProfilePath } from '../../const/routes'

export const TopRatingRow = ({ user }) => (
  <ListItem>
    <TextSpan textAlign="right">
      <StyledLink to={createProfilePath(user.id)}>{user.name} ({user.rating})</StyledLink>
    </TextSpan>
  </ListItem>
)

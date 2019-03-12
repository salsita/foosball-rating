import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import {
  TextSpan,
  ListItem,
  StyledLink,
} from '../../../styles/blocks';
import { createProfilePath } from '../../const/routes';

const TopRatingRowComponent = ({user}) => (
  <ListItem>
    <TextSpan textAlign="right">
      <StyledLink to={createProfilePath(user.id)}>{user.name} ({user.rating})</StyledLink>
    </TextSpan>
  </ListItem>
)

export const TopRatingRow = withRouter(TopRatingRowComponent)

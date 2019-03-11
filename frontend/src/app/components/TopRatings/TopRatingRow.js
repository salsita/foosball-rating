import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import {
  TextSpan,
  ListItem,
  ALink,
} from '../../../styles/blocks';
import { createProfilePath } from '../../const/routes';

const TopRatingRowComponent = ({user}) => (
  <ListItem>
    <TextSpan textAlign="right">
      <Link to={createProfilePath(user.id)}>{user.name}</Link>{user.rating}
    </TextSpan>
  </ListItem>
)

export const TopRatingRow = withRouter(TopRatingRowComponent)

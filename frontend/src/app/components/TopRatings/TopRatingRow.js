import React from 'react';
import {
  TextSpan,
  ListItem,
  ALink,
} from '../../../styles/blocks';

const TopRatingRow = ({data}) => (
  <ListItem>
    <TextSpan textAlign="right">
      <ALink>{data.name}</ALink>{data.rating}
    </TextSpan>
  </ListItem>
)

export default TopRatingRow;

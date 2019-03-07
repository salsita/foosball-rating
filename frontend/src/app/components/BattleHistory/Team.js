import React from 'react';
import {
  WinnerSpan,
  ListItem,
  ALink,
} from '../../../styles/blocks';
import cx from 'classnames';

const Team = ({ team }) => (
  <WinnerSpan winner={team.winner}>
      <ALink>{team.name1}</ALink>
      &
      <ALink>{team.name2}</ALink>
  </WinnerSpan>
)

export default Team;

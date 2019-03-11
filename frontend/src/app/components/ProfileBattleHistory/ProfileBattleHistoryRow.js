import React from 'react';
import { ListItem, TextSpan } from './../../../styles/blocks';

const ProfileBattleHistoryRow = ({ data }) => (
  <ListItem>
    <TextSpan>{data.date}</TextSpan>
    <TextSpan>{data.name}</TextSpan>
    <TextSpan>{data.ratingChange}</TextSpan>
  </ListItem>
)

export default ProfileBattleHistoryRow;


import React from 'react';

const ProfileBattleHistoryRow = ({ data }) => (
  <li>
    <span>{data.date}</span>
    <span>{data.name}</span>
    <span>{data.ratingChange}</span>
  </li>
)

export default ProfileBattleHistoryRow;

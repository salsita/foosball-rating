import React, { Component } from 'react';
import { ListCon } from './../../../styles/blocks';
import ProfileBattleHistoryRow from './ProfileBattleHistoryRow';

const profileMatches = [
  {
    date: '1.12.2019',
    name: 'Foosball',
    ratingChange: '+12'
  },{
    date: '1.12.2019',
    name: 'Foosball',
    ratingChange: '-9'
  },{
    date: '1.12.2019',
    name: 'Foosball',
    ratingChange: '+8'
  },
]

class ProfileBattleHistory extends Component {
  render() {
    return(
      <ListCon>
        {profileMatches.map((data) => 
          <ProfileBattleHistoryRow data={data} /> 
        )}
      </ListCon>
    )
  }
}

export default ProfileBattleHistory;

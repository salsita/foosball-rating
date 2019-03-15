import React, { Component } from 'react';
import { ListCon } from './../../../styles/blocks';
import { ProfileBattleHistoryRow } from './ProfileBattleHistoryRow';

class ProfileBattleHistory extends Component {
  render() {
    return(
      <ListCon>
        {this.props.matches.map((match) => 
          <ProfileBattleHistoryRow key={match.id} match={match} /> 
        )}
      </ListCon>
    )
  }
}

export default ProfileBattleHistory;

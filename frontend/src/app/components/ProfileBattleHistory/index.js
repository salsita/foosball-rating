import React, { Component } from 'react';
import { ListCon } from './../../../styles/blocks';
import { ProfileBattleHistoryRow } from './ProfileBattleHistoryRow';

class ProfileBattleHistory extends Component {
  render() {
    return(
      <ListCon>
        {this.props.matches.map((match) => 
          <ProfileBattleHistoryRow match={match} /> 
        )}
      </ListCon>
    )
  }
}

export default ProfileBattleHistory;

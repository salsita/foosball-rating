import React, { Component } from 'react';
import { 
  Title, TextSpan, Subtitle,
  Card
} from './../../../styles/blocks';
import ProfileBattleHistory from './../../components/ProfileBattleHistory'

const userDetails = {
  name: 'thomas',
  totalRating: '+1634',
  matches: '20',
  winRating: '46%',
  winStreak: '6'
}

const historicalMatches = [
  {
    data: '1/3/2019',
    name: 'Foosball',
    ratingDiff: '+12'
  },{
    data: '28/2/2019',
    name: 'Foosball',
    ratingDiff: '-5'
  },{
    data: '25/2/2019',
    name: 'Foosball',
    ratingDiff: '+7'
  },
];

class Profile extends Component {
  render() {
    return(
      <Card>
        <Title>{userDetails.name}</Title>
        <Subtitle>{userDetails.totalRating}</Subtitle>

        <div>
          <TextSpan>MAtches:{userDetails.matches}</TextSpan>
          
          <TextSpan>Win rating:{userDetails.winRating}</TextSpan>
          
          <TextSpan>Win streak:{userDetails.winStreak}</TextSpan>
        </div>
        <ProfileBattleHistory />
      </ Card>
    )
  }
}

export default Profile;

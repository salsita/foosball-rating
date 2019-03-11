import React, { Component } from 'react';
import { 
  Title,
  Subtitle,
  Box, ProfileDetail
} from './../../../styles/blocks';
import ProfileBattleHistory from './../../components/ProfileBattleHistory'

const userDetails = {
  name: 'Jack',
  totalRating: '+1600',
  matches: '20',
  winRatings: '46%',
  winStreak: '6'
};

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
      <Box Display="inline-block" Padding="20px" Margin="20px 0">
        <Title>{userDetails.name}</Title>
        <Subtitle>ELO: {userDetails.totalRating}</Subtitle>
        <ProfileDetail>
          <Subtitle>Matches: {userDetails.matches}</Subtitle>
          <Subtitle>Win Rate: {userDetails.winRatings}</Subtitle>
          <Subtitle>Win Streak: {userDetails.winStreak}</Subtitle>
          
        </ProfileDetail>
        <ProfileBattleHistory />
      </Box>
    )
  }
}

export default Profile;

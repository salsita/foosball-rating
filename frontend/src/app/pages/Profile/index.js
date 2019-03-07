import React, { Component } from 'react';
import { 
  Title,
  Subtitle,
  GridContainer,
  Button,
  SelectBox, SelectLabel
} from './../../../styles/blocks';
import ProfileBattleHistory from './../../components/ProfileBattleHistory'

const TotalRating = '+1642';

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
      <>
        <Title>Profile</Title>
        <Subtitle>{TotalRating}</Subtitle>
        <ProfileBattleHistory />
      </>
    )
  }
}

export default Profile;

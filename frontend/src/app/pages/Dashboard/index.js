import React, { Component } from 'react';

import { 
  Subtitle,
  Button
} from './../../../styles/blocks';


import BattleHistory from './../../components/BattleHistory/BattleHistory';
import TopRating from '../../components/TopRatings/TopRating';


class Dashboard extends Component {
  render() {
    return(
      <>
      <Subtitle textAlign="center">Last Battles</Subtitle>
      <BattleHistory />
      <Subtitle textAlign="center">Top Rating</Subtitle>
      <TopRating />
      
      <Button>Add Match</Button>

      </>
    )
  }
}

export default Dashboard;

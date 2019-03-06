import React, { Component } from 'react';

import { 
  Subtitle,
  Btn
} from './../../../styles/blocks';


import BattleHistory from './../../components/BattleHistory';
import TopRating from './../../components/TopRating';


class Dashboard extends Component {
  render() {
    return(
      <>
      <Subtitle textAlign="center">Last Battles</Subtitle>
      <BattleHistory />
      <Subtitle textAlign="center">Top Rating</Subtitle>
      <TopRating />
      
      <Btn>Add Match</Btn>

      </>
    )
  }
}

export default Dashboard;
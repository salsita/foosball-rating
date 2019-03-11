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
        <Button>Add Match</Button>
        <Subtitle textAlign="center">Last Battles</Subtitle>
        <BattleHistory maxItems={5} />
        <Subtitle textAlign="center">Top Rating</Subtitle>
        <TopRating maxItems={5} />
      </>
    )
  }
}

export default Dashboard;

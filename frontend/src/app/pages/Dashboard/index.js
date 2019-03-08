import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
  Subtitle,
  Button
} from './../../../styles/blocks';
import BattleHistory from './../../components/BattleHistory/BattleHistory';
import TopRating from '../../components/TopRatings/TopRating';
import { StatusReportField } from '../../components/StatusReport/StatusReportField';

class Dashboard extends Component {
  render() {
    return(
      <>
        <Button>Add Match</Button>
        <StatusReportField status={this.props.requestStatus} />
        <Subtitle textAlign="center">Last Battles</Subtitle>
        <BattleHistory maxItems={5} />
        <Subtitle textAlign="center">Top Rating</Subtitle>
        <TopRating maxItems={5} />
      </>
    )
  }
}

const mapStateToProps = state => ({
  requestStatus: state.matches.status
})

const LinkedDashboard = connect(mapStateToProps)(Dashboard)
export default LinkedDashboard

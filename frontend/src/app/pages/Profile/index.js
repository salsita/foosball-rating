import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
  Title,
  Subtitle,
  Box, ProfileDetail
} from './../../../styles/blocks';
import ProfileBattleHistory from './../../components/ProfileBattleHistory'
import { getUser } from '../../modules/users/users-selectors'
import { getStatisticsForUser } from '../../modules/matches/matches-selectors';

class ProfileComponent extends Component {
  render() {
    if (!this.props.user) {
      return <div />
    }

    return(
      <Box Display="inline-block" Padding="20px" Margin="20px 0">
        <Title>{this.props.user.name}</Title>
        <Subtitle>Elo rating: {this.props.user.rating}</Subtitle>
        <ProfileDetail>
          <Subtitle>Matches: {this.props.statistics.totalMatches}</Subtitle>
          <Subtitle>Win Rate: {this.props.statistics.winRatio * 100}%</Subtitle>
          <Subtitle>Win Streak: {this.props.statistics.longestStreak}</Subtitle>
        </ProfileDetail>
        <ProfileBattleHistory matches={this.props.statistics.matchChanges} />
      </Box>
    )
  }
}


const mapStateToProps = (state, props) => ({
  user: getUser(state, props),
  statistics: getStatisticsForUser(state, props)
})

export const Profile = connect(mapStateToProps)(ProfileComponent)

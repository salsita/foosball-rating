import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Title,
  Subtitle,
  Box, ProfileDetail,
} from './../../../styles/blocks'
import ProfileBattleHistory from './../../components/ProfileBattleHistory'
import ProfileRatingGraph from '../../components/ProfileRatingGraph'
import { getUser } from '../../modules/users/users-selectors'
import { getStatisticsForUser } from '../../modules/matches/matches-selectors'

class ProfileComponent extends Component {
  render() {
    if (!this.props.user) {
      return <div />
    }

    const {
      user: { name, rating, id },
      statistics: {
        totalMatches,
        winRatio,
        matchChanges,
        streaks: {
          currentWinStreak,
          longestWinStreak,
          currentEloGainStreak,
          highestEloGainStreak,
        },
      },
    } = this.props

    return (
      <Box Display="inline-block" Padding="20px" Margin="20px 0">
        <Title>{name}</Title>
        <Subtitle>ELO rating: {rating}</Subtitle>
        <ProfileDetail>
          <Subtitle>Matches: {totalMatches}</Subtitle>
          <Subtitle>Win Rate: {(winRatio * 100).toFixed(2)}%</Subtitle>
          <Subtitle>Longest Win Streak: {longestWinStreak}</Subtitle>
          <Subtitle>Current Win Streak: {currentWinStreak}</Subtitle>
          <Subtitle>Highest ELO Gain Streak: {highestEloGainStreak}</Subtitle>
          <Subtitle>Current ELO Gain Streak: {currentEloGainStreak}</Subtitle>
        </ProfileDetail>
        <ProfileRatingGraph userId={id} />
        <ProfileBattleHistory matches={matchChanges} />
      </Box>
    )
  }
}


const mapStateToProps = (state, props) => ({
  user: getUser(state, Number(props.match.params.userId)),
  statistics: getStatisticsForUser(state, Number(props.match.params.userId)),
})

export const Profile = connect(mapStateToProps)(ProfileComponent)

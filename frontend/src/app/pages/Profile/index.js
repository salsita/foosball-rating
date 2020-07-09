import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Title,
  Subtitle,
  Box, ProfileDetail,
} from './../../../styles/blocks'
import { ProfileBattleHistory } from './../../components/ProfileBattleHistory'
import { ProfileRatingGraph } from '../../components/ProfileRatingGraph'
import { ProfileStatistics } from '../../components/ProfileStatistics'
import { getPlayer, getRankingsForPlayer } from '../../modules/players/players-selectors'
import { getStatisticsForPlayer } from '../../modules/matches/matches-selectors'

class ProfileComponent extends Component {
  render() {
    if (!this.props.player) {
      return <div />
    }

    const {
      constructUrl,
      player: { name, rating, id },
      rankings,
      statistics,
      statistics: { totalMatches, wins, winRatio, longestStreak, matchChanges },
    } = this.props

    return (
      <Box Display="inline-block" Padding="20px" Margin="20px 0">
        <Title>{name}</Title>
        <Subtitle>Elo rating: {rating}</Subtitle>
        <ProfileDetail>
          <Subtitle>Matches: {totalMatches}</Subtitle>
          <Subtitle>Wins: {wins}</Subtitle>
          <Subtitle>Win Rate: {(winRatio * 100).toFixed(2)}%</Subtitle>
          <Subtitle>Win Streak: {longestStreak}</Subtitle>
        </ProfileDetail>
        <ProfileStatistics statistics={statistics} rankings={rankings} constructUrl={constructUrl} />
        <ProfileRatingGraph playerId={id} />
        <ProfileBattleHistory matches={matchChanges} />
      </Box>
    )
  }
}


const mapStateToProps = (state, { match: { params: { playerId } } }) => ({
  player: getPlayer(state, Number(playerId)),
  rankings: getRankingsForPlayer(state, Number(playerId)),
  statistics: getStatisticsForPlayer(state, Number(playerId)),
})

export const Profile = connect(mapStateToProps)(ProfileComponent)

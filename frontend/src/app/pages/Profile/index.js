import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Title,
  Subtitle,
  Box, ProfileDetail,
} from './../../../styles/blocks'
import { ProfileBattleHistory } from './../../components/ProfileBattleHistory'
import { ProfileRatingGraph } from '../../components/ProfileRatingGraph'
import { getPlayer } from '../../modules/players/players-selectors'
import { getStatisticsForPlayer } from '../../modules/matches/matches-selectors'

class ProfileComponent extends Component {
  render() {
    if (!this.props.player) {
      return <div />
    }

    const {
      player: { name, rating, id },
      statistics: { totalMatches, winRatio, longestStreak, matchChanges },
    } = this.props

    return (
      <Box Display="inline-block" Padding="20px" Margin="20px 0">
        <Title>{name}</Title>
        <Subtitle>Elo rating: {rating}</Subtitle>
        <ProfileDetail>
          <Subtitle>Matches: {totalMatches}</Subtitle>
          <Subtitle>Win Rate: {(winRatio * 100).toFixed(2)}%</Subtitle>
          <Subtitle>Win Streak: {longestStreak}</Subtitle>
        </ProfileDetail>
        <ProfileRatingGraph playerId={id} />
        <ProfileBattleHistory matches={matchChanges} />
      </Box>
    )
  }
}


const mapStateToProps = (state, props) => ({
  player: getPlayer(state, Number(props.match.params.playerId)),
  statistics: getStatisticsForPlayer(state, Number(props.match.params.playerId)),
})

export const Profile = connect(mapStateToProps)(ProfileComponent)

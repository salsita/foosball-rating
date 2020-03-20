import React from 'react'
import { TextSpan, TextDiv, ListItem, StyledLink } from '../../../styles/blocks'
import { createProfilePath } from '../../const/routes'
import { connect } from 'react-redux'
import { getSelectedGamePath } from '../../modules/games/games-selectors'

const trophies = [
  require('../../../media/trophy-1.svg'),
  require('../../../media/trophy-2.svg'),
  require('../../../media/trophy-3.svg'),
]

const LeaderboardRowComponent = ({ player, position, points, parentPath }) => (
  <ListItem>
    <TextSpan align="left">{
      position > 3 ? (position + '.') : <img src={trophies[position - 1]} />
    }</TextSpan>
    <TextDiv>
      <StyledLink to={`${parentPath}${createProfilePath(player.id)}`}>{player.name} ({points})</StyledLink>
    </TextDiv>
  </ListItem>
)

const mapStateToProps = state => ({
  parentPath: getSelectedGamePath(state),
})

export const LeaderboardRow = connect(mapStateToProps)(LeaderboardRowComponent)

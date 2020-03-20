import React from 'react'
import {
  WinnerSpan,
  StyledLink,
} from '../../../styles/blocks'
import { createProfilePath } from '../../const/routes'
import { connect } from 'react-redux'
import { getSelectedGamePath } from '../../modules/games/games-selectors'

const createListFromTeam = (parentPath, team) => team
  .map((player, index) => [<StyledLink key={index} to={`${parentPath}${createProfilePath(player.id)}`}>{player.name}
    <span>({player.matchRating})</span></StyledLink>])
  .reduce((prev, curr) => [...prev, '&', ...curr])

export const TeamComponent = ({ team, didWin, parentPath }) => (
  <WinnerSpan winner={didWin}>
    {createListFromTeam(parentPath, team)}
  </WinnerSpan>
)

const mapStateToProps = state => ({
  parentPath: getSelectedGamePath(state),
})

export const Team = connect(mapStateToProps)(TeamComponent)

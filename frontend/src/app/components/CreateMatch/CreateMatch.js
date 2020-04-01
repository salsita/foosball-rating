import React, { Component } from 'react'
import {
  Title,
  GridContainer,
  Box,
} from '../../../styles/blocks'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getPlayers } from '../../modules/players/players-selectors'
import { SelectTeamForm } from './SelectTeamForm'
import { MatchesActions } from '../../modules/matches/matches-actions'
import { StatusType } from '../../modules/api/request-status'
import { SnackbarAlert } from '../SnackbarAlert/SnackbarAlert'
import { RootActions } from '../../modules/root/root-actions'
import { CircularProgress } from '@material-ui/core'

export class CreateMatchComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      team1: [],
      team2: [],
    }
  }

  team1Changed = team1 => {
    this.setState({
      team1,
    })
  }

  team2Changed = team2 => {
    this.setState({
      team2,
    })
  }

  hasEnoughPlayersOnTeam = team => team.length >= this.props.minPlayerNumber

  arePlayersDistinct = () => {
    const allPlayers = [...this.state.team1, ...this.state.team2]
    const distinctPlayersSet = new Set(allPlayers)
    return allPlayers.length === distinctPlayersSet.size
  }

  getInputErrorMessage = () => {
    if (!this.hasEnoughPlayersOnTeam(this.state.team1)) {
      return 'Not enough players on Team 1'
    }

    if (!this.hasEnoughPlayersOnTeam(this.state.team2)) {
      return 'Not enough players on Team 2'
    }

    if (!this.arePlayersDistinct()) {
      return 'A single player can\'t be selected twice'
    }

    return null
  }

  submit = team1Won => {
    if (this.getInputErrorMessage()) {
      return
    }

    this.props.createMatch({
      team1: this.state.team1,
      team2: this.state.team2,
      team1Won,
    })
  }

  componentWillReceiveProps = newProps => {
    const redirect = newProps.activeRedirect
    if (redirect != null) {
      newProps.history.push(newProps.constructUrl(redirect))
      newProps.dismissRedirect()
    }
  }

  render = () => {
    const errorMessage = this.getInputErrorMessage()
    const canSubmit = !errorMessage && this.props.status.type !== StatusType.IN_PROGRESS

    const progress = this.props.status.type === StatusType.IN_PROGRESS
      ? <CircularProgress variant="indeterminate" />
      : null

    return (
      <>
        <Title Margin="10px 0">Match</Title>
        <GridContainer Column="1fr 1fr">
          <Box Margin="0 10px 10px" Padding="10px 10px 20px">
            <SelectTeamForm
              maxPlayerNumber={this.props.maxPlayerNumber}
              teamName="Team 1"
              players={this.props.players}
              teamChanged={this.team1Changed}
              teamSubmitted={() => this.submit(true)}
              canSubmit={canSubmit} />
          </Box>
          <Box Margin="0 10px 10px" Padding="10px 10px 20px">
            <SelectTeamForm
              maxPlayerNumber={this.props.maxPlayerNumber}
              teamName="Team 2"
              players={this.props.players}
              teamChanged={this.team2Changed}
              teamSubmitted={() => this.submit(false)}
              canSubmit={canSubmit} />
          </Box>
        </GridContainer>
        <div>{errorMessage || ''}</div>
        <SnackbarAlert />
        {progress}
      </>
    )
  }
}

const mapStateToProps = state => ({
  players: getPlayers(state),
  status: state.matchesStatus,
  activeRedirect: state.activeRedirect,
})

const mapDispatchToProps = dispatch => ({
  createMatch: match => {
    dispatch(MatchesActions.Creators.addMatch(match))
  },
  dismissRedirect: () => {
    dispatch(RootActions.Creators.dismissRedirect())
  },
})

const RoutingCreateMatchComponent = withRouter(CreateMatchComponent)
export const CreateMatch = connect(mapStateToProps, mapDispatchToProps)(RoutingCreateMatchComponent)

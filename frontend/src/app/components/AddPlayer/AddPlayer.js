import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PlayersActions } from '../../modules/players/players-actions'
import { Box, GridContainer, Input, Label, Button } from './../../../styles/blocks'
import { StatusType } from '../../modules/api/request-status'
import { SnackbarAlert } from '../SnackbarAlert/SnackbarAlert'
import { CircularProgress } from '@material-ui/core'

class AddPlayerComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      initialRating: 1000,
    }
    this.nameChanged = this.nameChanged.bind(this)
    this.initialRatingChanged = this.initialRatingChanged.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  submitForm = () => this.props.addPlayer({
    name: this.state.name,
    initialRating: this.state.initialRating,
  })

  nameChanged = event => {
    const name = event.target.value
    this.setState(state => ({
      ...state,
      name,
    }))
  }

  initialRatingChanged = event => {
    const initialRating = Number(event.target.value)
    this.setState(state => ({
      ...state,
      initialRating,
    }))
  }

  render = () => {
    const canSubmit = this.props.status.type !== StatusType.IN_PROGRESS

    const progress = this.props.status.type === StatusType.IN_PROGRESS
      ? <CircularProgress variant='indeterminate' />
      : null

    return (
      <>
        <Box Margin='20px 10px' Display='inline-block'>
          <GridContainer Column='1fr 1fr' Padding='10px'>
            <Label>
              Name:
            </Label>
            <Input id='player-name-input' value={this.state.name} onChange={this.nameChanged} />
          </GridContainer>
          <GridContainer Column='1fr 1fr' Padding='10px'>
            <Label>
              Initial Rating:
            </Label>
            <Input
              id='player-rating-input'
              type='number'
              value={this.state.initialRating}
              onChange={this.initialRatingChanged} />
          </GridContainer>
          <Button id='add-player-button' onClick={this.submitForm} enabled={canSubmit}>Create</Button>
        </Box>
        <SnackbarAlert />
        <div>
          {progress}
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  status: state.playersStatus,
})

const mapDispatchToProps = dispatch => ({
  addPlayer: player => dispatch(PlayersActions.Creators.addPlayer(player)),
})

export const AddPlayer = connect(mapStateToProps, mapDispatchToProps)(AddPlayerComponent)

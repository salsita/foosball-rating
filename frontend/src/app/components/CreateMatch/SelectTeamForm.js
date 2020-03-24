import React, { Component } from 'react'
import {
  Subtitle,
  Button,
} from './../../../styles/blocks'
import { SelectInput } from '../SelectInput/index'

const INVALID_PLAYER_ID = -1

export class SelectTeamForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPlayerIds: Array(props.maxPlayerNumber).fill(-1),
    }
  }

  createPlayerItems = () => this.props.players.map(player => ({
    label: player.name,
    value: player.id,
  }))

  createPlayerItemsWithNone = () => [{
    label: 'None',
    value: INVALID_PLAYER_ID,
  }, ...this.createPlayerItems()]

  playerSelected = (index, playerId) => {
    this.setState(state => {
      const selectedPlayerIds = [...state.selectedPlayerIds]
      selectedPlayerIds[index] = playerId
      return {
        selectedPlayerIds,
      }
    }, () => {
      const validPlayers = this.state.selectedPlayerIds
        .filter(playerId => playerId !== INVALID_PLAYER_ID)
      this.props.teamChanged(validPlayers)
    })
  }

  render = () => {
    const playerItems = this.createPlayerItemsWithNone()
    const selectInputs = this.state.selectedPlayerIds.map((playerId, index) => (
      <SelectInput
        key={index} selectedValue={playerId} items={playerItems}
        onChange={event => this.playerSelected(index, Number(event.target.value))} />
    ))
    return (
      <>
        <Subtitle>{this.props.teamName}</Subtitle>
        {selectInputs}
        <Button disabled={!this.props.canSubmit} onClick={this.props.teamSubmitted}>
          {this.props.teamName} Win
        </Button>
      </>
    )
  }
}

import React, { Component } from 'react'
import { 
    Subtitle,
    Button,
} from './../../../styles/blocks';
import SelectInput from '../SelectInput/index'

const INVALID_PLAYER_ID = -1

export class SelectTeamForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedPlayerIds: Array(props.maxPlayerNumber).fill(-1)
        }
    }

    createUserItems = () => this.props.users.map(user => ({
        label: user.name,
        value: user.id
    }))

    createUserItemsWithNone = () => [{
        label: "None",
        value: INVALID_PLAYER_ID
    }, ...this.createUserItems()]

    playerSelected = (index, playerId) => {
        this.setState((state, props) => {
            const selectedPlayerIds = [...state.selectedPlayerIds]
            selectedPlayerIds[index] = playerId
            return {
                selectedPlayerIds
            }
        }, () => {
            const validPlayers = this.state.selectedPlayerIds.filter(playerId => playerId !== INVALID_PLAYER_ID)
            this.props.teamChanged(validPlayers)
        })
    }

    render = () => {
        const userItems = this.createUserItemsWithNone()
        const selectInputs = this.state.selectedPlayerIds.map((playerId, index) => (
            <SelectInput key={index} selectedValue={playerId} items={userItems} onChange={(event) => this.playerSelected(index, event.target.value)}/>
        ))
        return (
            <>                        
                <Subtitle>{this.props.teamName}</Subtitle>
                    {selectInputs}
                <Button disabled={!this.props.canSubmit} onClick={this.props.teamSubmitted}>{this.props.teamName} Win</Button>
            </>
        )
    }
}

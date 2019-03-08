import React, { Component } from 'react'
import { 
    Subtitle,
    Button,
} from './../../../styles/blocks';
import SelectInput from '../SelectInput/index'

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
        value: -1
    }, ...this.createUserItems()]

    playerSelected = (index, playerId) => {
        const selectedPlayerIds = [...this.state.selectedPlayerIds]
        selectedPlayerIds[index] = playerId

        this.setState({
            selectedPlayerIds
        })

        this.props.teamChanged(selectedPlayerIds.filter(playerId => playerId != -1))
    }

    render = () => {
        const userItems = this.createUserItemsWithNone()
        const selectInputs = this.state.selectedPlayerIds.map((playerId, index) => (
            <SelectInput selectedValue={playerId} items={userItems} onChange={(event) => this.playerSelected(index, event.target.value)}/>
        ))
        return (
            <>                        
                <Subtitle>{this.props.teamName}</Subtitle>
                    {selectInputs}
                <Button onClick={this.props.teamSubmitted}>{this.props.teamName} Win</Button>
            </>
        )
    }
}

import React, { Component } from 'react'
import { connect } from "react-redux"
import { UsersActions } from '../../modules/users/users-actions'

class AddUserForm extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            initialRating: 1000
        }
        this.nameChanged = this.nameChanged.bind(this)
        this.initialRatingChanged = this.initialRatingChanged.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    submitForm = () => this.props.addUser({ 
        name: this.state.name, 
        initialRating: this.state.initialRating 
    })

    nameChanged = (event) => {
        const name = event.target.value
        this.setState((state, props) => ({
            ...state,
            name
        }))
    }

    initialRatingChanged = (event) => {
        const initialRating = event.target.value
        this.setState((state, props) => ({
            ...state,
            initialRating
        }))
    }

    render = () => (
        <form onSubmit={this.submitForm}>
            <label>
                <p>
                    Name:
                </p>
            </label>
            <input value={this.state.name} onChange={this.nameChanged} />
            <label>
                <p>
                    Initial Rating:
                </p>
            </label>
            <input type="number" value={this.state.initialRating} onChange={this.initialRatingChanged} />
            <input type="submit" value="Create" />
        </form>
    )
} 

const mapDispatchToProps = dispatch => ({
    addUser: user => dispatch(UsersActions.Creators.addUser(user))
})

export const SmartAddUserForm = connect(null, mapDispatchToProps)(AddUserForm)

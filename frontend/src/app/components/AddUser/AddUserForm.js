import React, { Component } from 'react'
import { connect } from "react-redux"
import { UsersActions } from '../../modules/users/users-actions'
import { Box, GridContainer, Input, Label, Button } from './../../../styles/blocks'

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
    <Box Margin="20px 10px" Display="inline-block">
      <form onSubmit={this.submitForm}>
        <GridContainer Column="1fr 1fr" Padding="10px">
          <Label>
              Name:
          </Label>
          <Input value={this.state.name} onChange={this.nameChanged} />
        </GridContainer>
        <GridContainer Column="1fr 1fr" Padding="10px">
          <Label>
              Initial Rating:
          </Label>
          <Input type="number" value={this.state.initialRating} onChange={this.initialRatingChanged} />
        </GridContainer>
        <Button type="submit" value="Create">Create</Button>
      </form>
    </Box>
  )
} 

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(UsersActions.Creators.addUser(user))
})

export const SmartAddUserForm = connect(null, mapDispatchToProps)(AddUserForm)

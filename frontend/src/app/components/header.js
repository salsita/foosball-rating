import React, { Component } from 'react'
import {
  Logo,
  Nav,
  Button,
  StyledLink,
} from './../../styles/blocks/'
import { CREATE_MATCH } from '../const/routes'
import { DASHBOARD } from '../const/routes'
import { withRouter } from 'react-router-dom'

const logo = require('./../../media/logo.png')

class HeaderComponent extends Component {
  createMatch = () => {
    this.props.history.push(CREATE_MATCH)
  }

  render() {
    return (
      <Nav>
        <Logo><StyledLink to={DASHBOARD}><img src={logo} alt="logo" /></StyledLink></Logo>
        <Button onClick={this.createMatch}>Add Match</Button>
      </Nav>
    )
  }
}

export const Header = withRouter(HeaderComponent)

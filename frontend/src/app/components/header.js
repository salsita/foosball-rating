import React from 'react'
import { connect } from 'react-redux'

import {
  Logo,
  Nav,
  Button,
  StyledLink,
} from './../../styles/blocks/'
import { CREATE_MATCH, LEADERBOARDS, DASHBOARD } from '../const/routes'
import { withRouter } from 'react-router-dom'
import { ThemeActions } from '../modules/theme/theme-actions'

const logo = require('./../../media/logo.png')

const HeaderComponent = ({ theme, history, changeTheme }) => {
  const createMatch = () => {
    history.push(CREATE_MATCH)
  }

  const displayLeaderboards = () => {
    history.push(LEADERBOARDS)
  }

  return (
    <Nav>
      <Logo><StyledLink to={DASHBOARD}><img src={logo} alt="logo" /></StyledLink></Logo>
      <Button onClick={() => {changeTheme(theme)}}>Theme</Button>
      <Button onClick={createMatch}>Add Match</Button>
      <Button onClick={displayLeaderboards}>Leaderboards</Button>
    </Nav>
  )
}

const mapStateToProps = state => ({
  theme: state.theme,
})

const mapDispatchToProps = dispatch => ({
  changeTheme: theme => {
    dispatch(ThemeActions.Creators.changeTheme(theme))
  },
})

export const Header = connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderComponent))

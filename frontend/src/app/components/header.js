import React from 'react'
import { connect } from 'react-redux'

import {
  Logo,
  Nav,
  Button,
  StyledLink,
} from './../../styles/blocks/'
import { CREATE_MATCH } from '../const/routes'
import { withRouter } from 'react-router-dom'
import { ThemeActions } from '../modules/theme/theme-actions'
import { ShowIfGameIsSelected } from './ShowIfGameSelected'

const logo = require('./../../media/logo.png')

const HeaderComponent = ({ theme, history, changeTheme, selectedGame }) => {
  const createMatch = () => {
    history.push(`/${selectedGame.name}${CREATE_MATCH}`)
  }

  return (
    <Nav>
      <Logo><StyledLink to={'/'}><img src={logo} alt="logo" /></StyledLink></Logo>
      <Button onClick={() => {changeTheme(theme)}}>Theme</Button>
      <ShowIfGameIsSelected>
        <Button onClick={createMatch}>Add Match</Button>
        <></>
      </ShowIfGameIsSelected>
    </Nav>
  )
}

const mapStateToProps = state => ({
  theme: state.theme,
  selectedGame: state.selectedGame,
})

const mapDispatchToProps = dispatch => ({
  changeTheme: theme => {
    dispatch(ThemeActions.Creators.changeTheme(theme))
  },
})

export const Header = connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderComponent))

import React from 'react'
import { connect } from 'react-redux'

import {
  Logo,
  Nav,
  Button,
  StyledLink,
} from './../../styles/blocks/'
import { ThemeActions } from '../modules/theme/theme-actions'

const logo = require('./../../media/logo.png')

const HeaderComponent = ({ theme, changeTheme, children }) => (
  <Nav>
    <Logo><StyledLink to={'/'}><img src={logo} alt="logo" /></StyledLink></Logo>
    <Button onClick={() => {changeTheme(theme)}}>Theme</Button>
    {children}
  </Nav>
)


const mapStateToProps = state => ({
  theme: state.theme,
})

const mapDispatchToProps = dispatch => ({
  changeTheme: theme => {
    dispatch(ThemeActions.Creators.changeTheme(theme))
  },
})

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)

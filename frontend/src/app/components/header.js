import React from 'react'
import { connect } from 'react-redux'

import {
  Logo,
  Nav,
  SimpleButton,
} from './../../styles/blocks/'
import { ThemeActions } from '../modules/theme/theme-actions'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import { ThemeTypes } from '../const/theme-types'

const HeaderComponent = ({ theme, changeTheme, children }) => (
  <Nav id="header">
    <Logo id="logo"/>
    {children}
    <SimpleButton id="theme" onClick={() => {changeTheme(theme)}}>
      { theme === ThemeTypes.Dark ? <Brightness7Icon /> : <Brightness4Icon/> }
    </SimpleButton>
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

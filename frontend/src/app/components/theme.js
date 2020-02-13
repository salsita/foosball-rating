import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as ROUTES from '../const/routes'
import { Header } from './header'
import Footer from './Footer/footer'
import { Container } from '../../styles/blocks/layout'
import { RootActions } from '../modules/root/root-actions'
// pages
import { Dashboard } from '../pages/Dashboard'
import { CreateMatchPage } from '../pages/CreateMatch'
import { Profile } from '../pages/Profile'
import { AddUserPage } from '../pages/AddUser'
import { MatchListPage } from '../pages/MatchList'
import { UserListPage } from '../pages/UserList'

const ThemeComponent = ({theme, themeTransition, changeTheme, stopThemeTransition}) => {
  const transition = themeTransition === 1 ? " theme-transition" : ""

  return (
    <Router>
      <div className={`${theme}${transition}`}>
        <Header changeTheme={changeTheme} stopThemeTransition={stopThemeTransition} />
        <Container>
          <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
          <Route exact path={ROUTES.CREATE_MATCH} component={CreateMatchPage} />
          <Route exact path={ROUTES.ADD_USER} component={AddUserPage} />
          <Route exact path={ROUTES.USER_LIST} component={UserListPage} />
          <Route exact path={ROUTES.MATCH_LIST} component={MatchListPage} />
          <Route exact path={ROUTES.PROFILE} component={Profile} />
        </Container>
        <Footer />
      </div>
    </Router>
  )
}

const mapStateToProps = state => ({
  theme: state.theme,
  themeTransition: state.themeTransition,
})

const mapDispatchToProps = dispatch => ({
  changeTheme: () => {
    dispatch(RootActions.Creators.changeTheme()) 
  },
  stopThemeTransition: () => {
    dispatch(RootActions.Creators.stopThemeTransition())
  }
})

export const Theme = connect(mapStateToProps, mapDispatchToProps)(ThemeComponent)

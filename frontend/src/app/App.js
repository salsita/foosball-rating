import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Theme } from './components/theme'
import * as ROUTES from './const/routes'
import { Header } from './components/header'
import { Footer } from './components/Footer/footer'
import { Container } from '../styles/blocks/layout'
// pages
import { Dashboard } from './pages/Dashboard'
import { LeaderboardPage } from './pages/Leaderboard'
import { CreateMatchPage } from './pages/CreateMatch'
import { Profile } from './pages/Profile'
import { AddPlayerPage } from './pages/AddPlayer'
import { MatchListPage } from './pages/MatchList'

export class App extends Component {
  render() {
    const matchUrl = this.props.match.url
    return (
      <Theme>
        <Header />
        <Container>
          <Switch>
            <Route exact path={`${matchUrl}${ROUTES.LEADERBOARD}`} component={LeaderboardPage} />
            <Route exact path={`${matchUrl}${ROUTES.CREATE_MATCH}`} component={CreateMatchPage} />
            <Route exact path={`${matchUrl}${ROUTES.ADD_PLAYER}`} component={AddPlayerPage} />
            <Route exact path={`${matchUrl}${ROUTES.MATCH_LIST}`} component={MatchListPage} />
            <Route exact path={`${matchUrl}${ROUTES.PROFILE}`} component={Profile} />
            <Route component={Dashboard} />
          </Switch>
        </Container>
        <Footer />
      </Theme>
    )
  }
}

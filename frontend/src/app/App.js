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
import { Button } from '../styles/blocks'

export class App extends Component {
  render() {
    const { match: { path } } = this.props
    const createMatch = () => {
      this.props.history.push(`${path}${ROUTES.CREATE_MATCH}`)
    }
    const constructUrl = relativePath => `${path}${relativePath}`
    return (
      <Theme>
        <Header>
          <Button onClick={createMatch}>Add Match</Button>
        </Header>
        <Container>
          <Switch>
            <Route exact path={constructUrl(ROUTES.LEADERBOARD)}>
              <LeaderboardPage constructUrl={constructUrl} />
            </Route>
            <Route exact path={constructUrl(ROUTES.CREATE_MATCH)}>
              <CreateMatchPage constructUrl={constructUrl} />
            </Route>
            <Route exact path={constructUrl(ROUTES.ADD_PLAYER)} component={AddPlayerPage} />
            <Route exact path={constructUrl(ROUTES.MATCH_LIST)}>
              <MatchListPage constructUrl={constructUrl} />
            </Route>
            <Route exact path={constructUrl(ROUTES.PROFILE)} component={Profile} />
            <Route>
              <Dashboard constructUrl={constructUrl} />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </Theme>
    )
  }
}

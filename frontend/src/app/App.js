import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

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
import { Button, Subtitle } from '../styles/blocks'
import { isGameSelected, selectionFailed } from './modules/games/games-selectors'
import { connect } from 'react-redux'

export class AppComponent extends Component {
  render() {
    const { match: { url, params: { gameName } }, isGameSelected, selectionFailed } = this.props
    const createMatch = () => {
      this.props.history.push(`${url}${ROUTES.CREATE_MATCH}`)
    }
    const constructUrl = relativePath => `${url}${relativePath}`
    return (
      <>
        <Header>
          { isGameSelected? <Button onClick={createMatch}>Add Match</Button> : null }
        </Header>
        <Container>
          { isGameSelected
            ? <Switch>
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
            : <Subtitle>{ selectionFailed? `Game '${gameName}' was not found!` : 'Loading...' } </Subtitle>
          }
        </Container>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = state => ({
  isGameSelected: isGameSelected(state),
  selectionFailed: selectionFailed(state),
})

export const App = connect(mapStateToProps)(AppComponent)

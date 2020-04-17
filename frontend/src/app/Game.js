import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import * as ROUTES from './const/routes'
import { Header } from './components/header'
import { Footer } from './components/Footer/footer'
// pages
import { Dashboard } from './pages/Dashboard'
import { LeaderboardPage } from './pages/Leaderboard'
import { CreateMatchPage } from './pages/CreateMatch'
import { Profile } from './pages/Profile'
import { AddPlayerPage } from './pages/AddPlayer'
import { MatchListPage } from './pages/MatchList'
import { SimpleButton, Subtitle, SimpleLink, Container } from '../styles/blocks'
import { connect } from 'react-redux'
import urljoin from 'url-join'
import { SelectionStatus } from './const/games'
import { capitalize } from './utils/string-utils'

export class GameComponent extends Component {
  render() {
    const { match: { url }, selection } = this.props
    const constructUrl = relativePath => urljoin(url, relativePath)
    const createMatch = () => {
      this.props.history.push(constructUrl(ROUTES.CREATE_MATCH))
    }
    return (
      <>
        <Header>
          { selection.status === SelectionStatus.SELECTED
            ? <>
              <span id='title'>
                <SimpleLink to={url}>{capitalize(selection.value.name)}</SimpleLink>
              </span>
              <SimpleButton onClick={createMatch}>Add Match</SimpleButton>
            </>
            : null }
        </Header>
        <Container id="container">
          { selection.status === SelectionStatus.SELECTED
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
            : <Subtitle>
              { selection.status === SelectionStatus.FAILED
                ? `Game '${selection.gameName}' was not found!`
                : 'Loading...' }
            </Subtitle>
          }
        </Container>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = state => ({
  selection: state.gameSelection,
})

export const Game = connect(mapStateToProps)(GameComponent)

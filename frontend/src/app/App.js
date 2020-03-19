import React, { Component } from 'react'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Theme } from './components/theme'
import { rootSaga } from './modules/root/root-saga'
import { rootReducer } from './modules/root/root-reducer'
import * as ROUTES from './const/routes'
import { Header } from './components/header'
import { Footer } from './components/Footer/footer'
import { Container } from '../styles/blocks/layout'
// pages
import { Dashboard } from './pages/Dashboard'
import { LeaderboardPage } from './pages/Leaderboard'
import { CreateMatchPage } from './pages/CreateMatch'
import { Profile } from './pages/Profile'
import { AddUserPage } from './pages/AddPlayer'
import { MatchListPage } from './pages/MatchList'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,
  compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : v => v))

sagaMiddleware.run(rootSaga)

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Theme>
          <Router>
            <>
              <Header />
              <Container>
                <Switch>
                  <Route exact path={ROUTES.LEADERBOARD} component={LeaderboardPage} />
                  <Route exact path={ROUTES.CREATE_MATCH} component={CreateMatchPage} />
                  <Route exact path={ROUTES.ADD_USER} component={AddUserPage} />
                  <Route exact path={ROUTES.MATCH_LIST} component={MatchListPage} />
                  <Route exact path={ROUTES.PROFILE} component={Profile} />
                  <Route component={Dashboard} />
                </Switch>
              </Container>
              <Footer />
            </>
          </Router>
        </Theme>
      </Provider>
    )
  }
}

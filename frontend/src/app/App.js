import React, { Component } from 'react'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { Theme } from './components/theme'
import { rootSaga } from './modules/root/root-saga'
import { rootReducer } from './modules/root/root-reducer'
import * as ROUTES from './const/routes'
import { Header } from './components/header'
import Footer from './components/Footer/footer'
import { Container } from '../styles/blocks/layout'
// pages
import { Dashboard } from './pages/Dashboard'
import { LeaderboardsPage } from './pages/Leaderboards'
import { CreateMatchPage } from './pages/CreateMatch'
import { Profile } from './pages/Profile'
import { AddUserPage } from './pages/AddUser'
import { MatchListPage } from './pages/MatchList'
import { UserListPage } from './pages/UserList'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,
  compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : v => v))

sagaMiddleware.run(rootSaga)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Theme>
          <Router>
            <>
              <Header />
              <Container>
                <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
                <Route exact path={ROUTES.LEADERBOARDS} component={LeaderboardsPage} />
                <Route exact path={ROUTES.CREATE_MATCH} component={CreateMatchPage} />
                <Route exact path={ROUTES.ADD_USER} component={AddUserPage} />
                <Route exact path={ROUTES.USER_LIST} component={UserListPage} />
                <Route exact path={ROUTES.MATCH_LIST} component={MatchListPage} />
                <Route exact path={ROUTES.PROFILE} component={Profile} />
              </Container>
              <Footer />
            </>
          </Router>
        </Theme>
      </Provider>
    )
  }
}

export default App

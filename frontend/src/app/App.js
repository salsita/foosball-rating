import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './modules/root/root-saga'
import { rootReducer } from './modules/root/root-reducer'
import * as ROUTES from './const/routes';
import Header from './components/header';
import {Container} from './../styles/blocks/layout';
// pages 
import Dashboard from './pages/Dashboard';
import CreateMatch from './pages/CreateMatch';
import Profile from './pages/Profile';
import { AddUser } from './pages/AddUser';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, 
  compose (applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : v => v))

sagaMiddleware.run(rootSaga)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Container>
            <Header />
            <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
            <Route exact path={ROUTES.CREATEMATCH} component={CreateMatch} />
            <Route exact path={ROUTES.PROFILE} component={Profile} />
            <Route exact path={ROUTES.ADD_USER} component={AddUser} />
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default App;

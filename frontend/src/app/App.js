import React, { Component } from 'react'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { Theme } from './components/theme'
import { rootSaga } from './modules/root/root-saga'
import { rootReducer } from './modules/root/root-reducer'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Root } from './components/Root'

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
              <Route path="/" component={Root}/>
            </>
          </Router>
        </Theme>
      </Provider>
    )
  }
}

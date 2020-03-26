import React from 'react'
import { Provider } from 'react-redux'
import { App } from './app/App'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { rootSaga } from './app/modules/root/root-saga'
import { rootReducer } from './app/modules/root/root-reducer'
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,
  compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : v => v))

sagaMiddleware.run(rootSaga)

export const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/foosball' component={App}/>
          <Route>
            <Redirect to='/foosball'/>
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

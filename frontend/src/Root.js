import React from 'react'
import { Provider } from 'react-redux'
import { App } from './app/App'
import { Router, Route, Switch } from 'react-router-dom'
import { rootSaga } from './app/modules/root/root-saga'
import { rootReducer } from './app/modules/root/root-reducer'
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { SelectGamePage } from './app/pages/SelectGamePage'
import { Theme } from './app/components/theme'
import { createBrowserHistory } from 'history'
import { RouterActions } from './app/modules/router/router-actions'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,
  compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : v => v))

sagaMiddleware.run(rootSaga)
const history = createBrowserHistory()
history.listen(location => {
  store.dispatch(RouterActions.Creators.urlChanged(location.pathname))
})
store.dispatch(RouterActions.Creators.urlInit(history.location.pathname))

export const Root = () =>
  <Provider store={store}>
    <Theme>
      <Router history={history}>
        <Switch>
          <Route path='/:gameName' component={App}/>
          <Route component={SelectGamePage} />
        </Switch>
      </Router>
    </Theme>
  </Provider>

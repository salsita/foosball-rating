import React from 'react'
import { connect } from 'react-redux'
import * as ROUTES from '../const/routes'

import { Route, Switch, withRouter } from 'react-router-dom'
// pages
import { Dashboard } from '../pages/Dashboard'
import { LeaderboardPage } from '../pages/Leaderboard'
import { CreateMatchPage } from '../pages/CreateMatch'
import { Profile } from '../pages/Profile'
import { AddPlayerPage } from '../pages/AddPlayer'
import { MatchListPage } from '../pages/MatchList'
import { getSelectedGamePath } from '../modules/games/games-selectors'

const GameComponent = ({ parentPath }) => {
  return (
    <Switch>
      <Route exact path={`${parentPath}${ROUTES.LEADERBOARD}`} component={LeaderboardPage} />
      <Route exact path={`${parentPath}${ROUTES.CREATE_MATCH}`} component={CreateMatchPage} />
      <Route exact path={`${parentPath}${ROUTES.ADD_PLAYER}`} component={AddPlayerPage} />
      <Route exact path={`${parentPath}${ROUTES.MATCH_LIST}`} component={MatchListPage} />
      <Route exact path={`${parentPath}${ROUTES.PROFILE}`} component={Profile} />
      <Route exact path={`${parentPath}${ROUTES.DASHBOARD}`} component={Dashboard} />
    </Switch>
  )
}

const mapStateToProps = state => ({
  parentPath: getSelectedGamePath(state),
})

export const Game = connect(mapStateToProps)(withRouter(GameComponent))

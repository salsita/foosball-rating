import { createReducer } from 'reduxsauce'

import { MatchesActions } from '../matches/matches-actions'
import { UsersActions } from '../users/users-actions'
import { ready, StatusType } from '../api/request-status'
import { RootActions } from './root-actions'
import { AlertType, UserAlert } from './user-alert'
import { DASHBOARD } from '../../const/routes'

const initialState = {
  matchesStatus: ready,
  matches: [],
  usersStatus: ready,
  users: [],
  activeAlert: null,
  activeRedirect: null,
  theme: window.localStorage.getItem("theme") || "dark",
  themeTransition: 0,
}

const usersLoaded = (state, { users }) => ({
  ...state,
  users
})

const updateUsersStatus = (state, { status }) => ({
  ...state,
  usersStatus: status,
  activeAlert: createAlertForUserStatusUpdate(status) || state.activeAlert,
})

const matchesLoaded = (state, { matches }) => ({
  ...state,
  matches,
})

const updateMatchesStatus = (state, { status }) => ({
  ...state,
  matchesStatus: status,
  activeAlert: createAlertForMatchesStatusUpdate(status) || state.activeAlert,
  activeRedirect: createRedirectForMatchesStatusUpdate(status) || state.activeRedirect,
})

const createRedirectForMatchesStatusUpdate = status => {
  if (status.type === StatusType.SUCCESS) {
    return DASHBOARD
  }
  return null
}

const createAlertForUserStatusUpdate = status => {
  switch (status.type) {
    case StatusType.SUCCESS:
      return new UserAlert('Successfully added!', AlertType.SUCCESS)
    case StatusType.FAILURE:
      return new UserAlert(`Failed to add user :( - ${status.error}`, AlertType.ERROR)
  }

  return null
}

const createAlertForMatchesStatusUpdate = status => {
  switch (status.type) {
    case StatusType.SUCCESS:
      return new UserAlert('Succesfully created!', AlertType.SUCCESS)
    case StatusType.FAILURE:
      return new UserAlert(`Failed to create match :( - ${status.error}`, AlertType.ERROR)
  }

  return null
}

const dismissRedirect = state => ({
  ...state,
  activeRedirect: null,
})

const dismissAlert = state => {
  if (!state.activeAlert) {
    return state
  }

  const dismissedAlert = state.activeAlert.asDismissed()

  return {
    ...state,
    activeAlert: dismissedAlert,
  }
}

const changeTheme = state => {
  const theme = state.theme === "dark" ? "light" : "dark"
  window.localStorage.setItem("theme", theme)

  return {
    ...state,
    theme,
    themeTransition: 1,
  }
}

const stopThemeTransition = state => {
  console.log("Calling second action")
  
  return {
    ...state,
    themeTransition: 0,
  }
}

export const rootReducer = createReducer(initialState, {
  [UsersActions.Types.USERS_LOADED]: usersLoaded,
  [UsersActions.Types.UPDATE_STATUS]: updateUsersStatus,
  [MatchesActions.Types.MATCHES_LOADED]: matchesLoaded,
  [MatchesActions.Types.UPDATE_STATUS]: updateMatchesStatus,
  [RootActions.Types.DISMISS_ALERT]: dismissAlert,
  [RootActions.Types.DISMISS_REDIRECT]: dismissRedirect,
  [RootActions.Types.CHANGE_THEME]: changeTheme,
  [RootActions.Types.STOP_THEME_TRANSITION]: stopThemeTransition,
})

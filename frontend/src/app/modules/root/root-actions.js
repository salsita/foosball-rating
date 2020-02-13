import { createActions } from 'reduxsauce'

export const RootActions = createActions({
  dismissAlert: [],
  dismissRedirect: [],
  changeTheme: [],
  stopThemeTransition: [],
}, {
  prefix: 'foosball-rating/root/',
})

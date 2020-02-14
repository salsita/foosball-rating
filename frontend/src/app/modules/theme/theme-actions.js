import { createActions } from 'reduxsauce'

export const ThemeActions = createActions({
  themeChanged: ['newTheme'],
  changeTheme: ['theme'],
  stopThemeTransition: [],
}, {
  prefix: 'foosball-rating/theme/',
})

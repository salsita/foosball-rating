import { createActions } from 'reduxsauce'

export const ThemeActions = createActions({
  themeChanged: ['newTheme'],
  changeTheme: ['currentTheme'],
  stopThemeTransition: [],
}, {
  prefix: 'foosball-rating/theme/',
})

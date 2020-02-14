import { createActions } from 'reduxsauce'

export const ThemeActions = createActions({
  themeChanged: ['theme'],
  changeTheme: ['theme'],
  stopThemeTransition: [],
}, {
  prefix: 'foosball-rating/theme/',
})

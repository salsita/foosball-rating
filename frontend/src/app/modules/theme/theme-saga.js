import { takeEvery, call, put, delay } from 'redux-saga/effects'
import { changeTheme } from './theme-effects'
import { ThemeActions } from './theme-actions'

function* changeThemeSaga(action) {
  try {
    const theme = yield call(changeTheme, action.theme)
    yield put(ThemeActions.Creators.themeChanged(theme))

    // Stop transition effect
    yield delay(320)
    yield put(ThemeActions.Creators.stopThemeTransition())
  } catch (error) {
    console.error(error)
  }
}

export function* themeSaga() {
  yield takeEvery(ThemeActions.Types.CHANGE_THEME, changeThemeSaga)
}

import { AppComponent } from './App'
import { Header } from './components/header'
import { Button } from '../styles/blocks'
import { shallowWithProps } from '../tests/utils'
import { HISTORY_MOCK, ROUTER_MATCH } from '../tests/mocks'
import { FOOSBALL_GAME, URLS } from '../tests/data'

describe('AppComponent', () => {
  let appComponent
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('when game is not selected and not found', () => {
    beforeEach(() => {
      appComponent = shallowWithProps(AppComponent, {
        match: { params: { gameName: FOOSBALL_GAME.name } },
        isGameSelected: false,
        gameNotFound: true,
      })
    })
    it('renders with no button and message "Game \'foosball\'" was not found', () => {
      expect(appComponent).toMatchSnapshot()
    })
  })

  describe('when game is selected', () => {
    beforeEach(() => {
      appComponent = shallowWithProps(AppComponent, {
        match: { ...ROUTER_MATCH, url: URLS.FOOSBALL },
        isGameSelected: true,
        history: HISTORY_MOCK,
      })
    })
    it('renders button Add Match in the header', () => {
      expect(appComponent).toMatchSnapshot()
    })
    describe('on Add Match button click', () => {
      beforeEach(() => {
        appComponent.find(Header).find(Button).simulate('click')
      })
      it('redirects to create match page', () => {
        expect(HISTORY_MOCK.push).toBeCalledWith(URLS.CREATE_FOOSBALL_MATCH)
      })
    })
  })

  describe('when game is not selected but could be found', () => {
    beforeEach(() => {
      appComponent = shallowWithProps(AppComponent, {
        match: { ...ROUTER_MATCH, url: URLS.FOOSBALL },
        isGameSelected: false,
        gameNotFound: false,
      })
    })
    it('renders header with no button and with message "Loading"', () => {
      expect(appComponent).toMatchSnapshot()
    })
  })
})

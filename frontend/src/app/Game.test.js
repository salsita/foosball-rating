import { GameComponent } from './Game'
import { Header } from './components/header'
import { Button } from '../styles/blocks'
import { shallowWithProps } from '../tests/utils'
import { HISTORY_MOCK, ROUTER_MATCH } from '../tests/mocks'
import { FOOSBALL_GAME, URLS } from '../tests/data'

describe('GameComponent', () => {
  let gameComponent
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('when game is not selected and not found', () => {
    beforeEach(() => {
      gameComponent = shallowWithProps(GameComponent, {
        match: { params: { gameName: FOOSBALL_GAME.name } },
        isGameSelected: false,
        selectionFailed: true,
      })
    })
    it('renders with no button and message "Game \'foosball\'" was not found', () => {
      expect(gameComponent).toMatchSnapshot()
    })
  })

  describe('when game is selected', () => {
    beforeEach(() => {
      gameComponent = shallowWithProps(GameComponent, {
        match: { ...ROUTER_MATCH, url: URLS.FOOSBALL },
        isGameSelected: true,
        history: HISTORY_MOCK,
      })
    })
    it('renders button Add Match in the header', () => {
      expect(gameComponent).toMatchSnapshot()
    })
    describe('on Add Match button click', () => {
      beforeEach(() => {
        gameComponent.find(Header).find(Button).simulate('click')
      })
      it('redirects to create match page', () => {
        expect(HISTORY_MOCK.push).toBeCalledWith(URLS.CREATE_FOOSBALL_MATCH)
      })
    })
  })

  describe('when game is not selected but could be found', () => {
    beforeEach(() => {
      gameComponent = shallowWithProps(GameComponent, {
        match: { ...ROUTER_MATCH, url: URLS.FOOSBALL },
        isGameSelected: false,
        selectionFailed: false,
      })
    })
    it('renders header with no button and with message "Loading"', () => {
      expect(gameComponent).toMatchSnapshot()
    })
  })
})

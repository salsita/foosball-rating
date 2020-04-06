import { GameComponent } from './Game'
import { Header } from './components/header'
import { Button } from '../styles/blocks'
import { shallowWithProps } from '../tests/utils'
import { HISTORY_MOCK, ROUTER_MATCH } from '../tests/mocks'
import { FOOSBALL_GAME, URLS } from '../tests/data'
import {
  createFailedSelection,
  createGameSelection,
  createEmptySelection,
} from './types/GameSelection'

describe('GameComponent', () => {
  let gameComponent
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('when foosball selection fails', () => {
    beforeEach(() => {
      gameComponent = shallowWithProps(GameComponent, {
        match: { },
        selection: createFailedSelection(FOOSBALL_GAME.name),
      })
    })
    it('renders with no button and message "Game \'foosball\'" was not found', () => {
      expect(gameComponent).toMatchSnapshot()
    })
  })

  describe('when foosball is selected', () => {
    beforeEach(() => {
      gameComponent = shallowWithProps(GameComponent, {
        match: { ...ROUTER_MATCH, url: URLS.FOOSBALL },
        selection: createGameSelection(FOOSBALL_GAME),
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
      it('redirects to foosball create match page', () => {
        expect(HISTORY_MOCK.push).toBeCalledWith(URLS.CREATE_FOOSBALL_MATCH)
      })
    })
  })

  describe('when the selection is empty', () => {
    beforeEach(() => {
      gameComponent = shallowWithProps(GameComponent, {
        match: { ...ROUTER_MATCH, url: URLS.FOOSBALL },
        selection: createEmptySelection(),
      })
    })
    it('renders header with no button and with message "Loading"', () => {
      expect(gameComponent).toMatchSnapshot()
    })
  })
})

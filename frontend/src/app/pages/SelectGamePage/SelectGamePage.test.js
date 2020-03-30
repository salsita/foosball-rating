import { SelectGamePageComponent } from './index'
import { SelectInput } from '../../components/SelectInput'
import { HISTORY_MOCK } from '../../../tests/mocks'
import { shallowWithProps } from '../../../tests/utils'
import { FOOSBALL_GAME, URLS } from '../../../tests/data'

describe('SelectGamePageComponent', () => {
  let selectGamePage
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('when there is a foosball game', () => {
    beforeEach(() => {
      selectGamePage = shallowWithProps(SelectGamePageComponent, {
        games: [ FOOSBALL_GAME ],
        history: HISTORY_MOCK,
      })
    })
    it('renders Header and select', () => {
      expect(selectGamePage).toMatchSnapshot()
    })
    describe('when foosball is selected', () => {
      beforeEach(() => {
        selectGamePage.find(SelectInput).simulate('change', {
          target: { value: FOOSBALL_GAME.name },
        })
      })
      it('push a redirect to history', () => {
        expect(HISTORY_MOCK.push).toBeCalledWith(URLS.FOOSBALL)
      })
    })
  })
})

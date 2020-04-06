// to avoid circular import in CreateMatch
import '../../modules/matches/matches-selectors'

import React from 'react'
import { shallow } from 'enzyme'
import { CreateMatchComponent } from './CreateMatch'

describe('CreateMatch', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('componentWillReceiveProps', () => {
    const INITIAL_STATE = { status: { type: null } }
    const HISTORY_MOCK = { push: jest.fn() }
    const DISMISS_REDIRECT_MOCK = jest.fn()
    const CONSTRUCTED_URL = 'foo'
    const CONSTRUCT_URL_MOCK = jest.fn(() => CONSTRUCTED_URL)
    const shallowCreateMatch = props => shallow(<CreateMatchComponent {...props}/>)
    describe('with active redirect', () => {
      beforeEach(() => {
        shallowCreateMatch(INITIAL_STATE).setProps({
          history: HISTORY_MOCK,
          activeRedirect: '',
          dismissRedirect: DISMISS_REDIRECT_MOCK,
          constructUrl: CONSTRUCT_URL_MOCK,
        })
      })
      it('constructs an url with a redirect', () => {
        expect(CONSTRUCT_URL_MOCK).toBeCalledWith('')
      })
      it('pushes a constructed url to history', () => {
        expect(HISTORY_MOCK.push).toBeCalledWith(CONSTRUCTED_URL)
      })
      it('dismisses redirect', () => {
        expect(DISMISS_REDIRECT_MOCK).toBeCalledTimes(1)
      })
    })
    describe('without active redirect', () => {
      beforeEach(() => {
        shallowCreateMatch(INITIAL_STATE).setProps({
          history: HISTORY_MOCK,
          activeRedirect: null,
          dismissRedirect: DISMISS_REDIRECT_MOCK,
          constructUrl: CONSTRUCT_URL_MOCK,
        })
      })
      it('does nothing', () => {
        expect(HISTORY_MOCK.push).not.toBeCalled()
        expect(DISMISS_REDIRECT_MOCK).not.toBeCalled()
        expect(CONSTRUCT_URL_MOCK).not.toBeCalled()
      })
    })
  })
})

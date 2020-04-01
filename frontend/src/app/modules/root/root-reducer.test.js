import { updateMatchesStatus } from './root-reducer'
import { StatusType } from '../api/request-status'
import { DASHBOARD } from '../../const/routes'

describe('updateMatchesStatus', () => {
  describe('activeRedirect', () => {
    const INITIAL_STATE = { activeRedirect: null }
    const SUCCESS_STATUS = { status: { type: StatusType.SUCCESS } }
    it('put activeRedirect as Dashboard with success', () => {
      const newState = updateMatchesStatus(INITIAL_STATE, SUCCESS_STATUS)
      expect(newState.activeRedirect).toEqual(DASHBOARD)
    })
    it.each([
      [ StatusType.FAILURE ],
      [ StatusType.IN_PROGRESS ],
      [ StatusType.READY ],
    ])('leaves previous activeRedirect with status %o', statusType => {
      const newState = updateMatchesStatus(INITIAL_STATE, { status: { type: statusType } })
      expect(newState.activeRedirect).toEqual(null)
    })
  })
})

import { isValidUserData } from './User'

const name = 'Roman'
const initialRating = 1000

describe('User', () => {
  describe('isValidUserData', () => {
    it.each([
      ['is an empty object', {}],
      ['has no name', { initialRating }],
      ['has no initialRating', { name }],
      ['has name as not a string', { name: 1, initialRating }],
      ['has name as an empty string', { name: '', initialRating }],
      ['has name non-trimmed', { name: ' Roman ', initialRating }],
      ['has initialRating as not a number', { name, initialRating: '4' }],
    ])('evaluates to false when %s', (desc, userData) => {
      expect(isValidUserData(userData)).toEqual(false)
    })
    it('evaluates to true when data is correct', () => {
      expect(isValidUserData({ name, initialRating })).toEqual(true)
    })
  })
})

import { isMatchDescription } from './MatchDescription'

const team1 = [ 1, 2 ]
const team2 = [ 3 ]
const team1Won = true

describe('MatchDescription', () => {
  describe('isMatchDescription', () => {
    it.each([
      ['is an empty object', {}],
      ['has no team1', { team2, team1Won }],
      ['has no team2', { team1, team1Won }],
      ['has no team1Won', { team1, team2 }],
      ['has team1 as not an array', { team1: {}, team2, team1Won }],
      ['has team2 as an array of objects', { team1, team2: [{}], team1Won }],
      ['has an empty team1', { team1: [], team2, team1Won }],
      ['has too many ids in team1', { team1: [ 1, 2, 5 ], team2, team1Won }],
      ['has team1Won as an integer', { team1, team2, team1Won: 1 }],
    ])('evaluates to false when %s', (desc, matchData) => {
      expect(isMatchDescription(matchData)).toEqual(false)
    })
    it('evaluates to true when data is correct', () => {
      expect(isMatchDescription({ team1, team2, team1Won }))
    })
  })
})

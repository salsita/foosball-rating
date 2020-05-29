import { isMatchDescription } from './MatchDescription'

const team1 = [ 1, 2 ]
const team2 = [ 3 ]
const score = { team1Score: 1, team2Score: 2 }

describe('MatchDescription', () => {
  describe('isMatchDescription', () => {
    it.each([
      ['is an empty object', {}],
      ['has no team1', { team2, ...score }],
      ['has no team2', { team1, ...score }],
      ['has no score', { team1, team2 }],
      ['has team1 as not an array', { team1: {}, team2, ...score }],
      ['has team2 as an array of objects', { team1, team2: [{}], ...score }],
      ['has an empty team1', { team1: [], team2, ...score }],
      ['has too many ids in team1', { team1: [ 1, 2, 5 ], team2, ...score }],
      ['has score as a float', { team1, team2, team1Score: 1.5, team2Score: 1 }],
      ['has a negative score', { team1, team2, team1Score: 1, team2Score: -1 }],
    ])('evaluates to false when %s', (desc, matchData) => {
      expect(isMatchDescription(matchData)).toEqual(false)
    })
    it('evaluates to true when data is correct', () => {
      expect(isMatchDescription({ team1, team2, ...score })).toEqual(true)
    })
  })
})

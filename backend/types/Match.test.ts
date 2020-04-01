import { TONDA_PLAYER, FOOSBALL_MATCH } from '../tests/TestData'
import { Match } from './Match'
import { InputError } from '../errors/InputError'

describe('Match', () => {
  it.each([
    [ 'with empty team 1', { ...FOOSBALL_MATCH, team1: [] } ],
    [ 'with empty team 2', { ...FOOSBALL_MATCH, team2: [] }],
    [ 'with too big team 1', {
      ...FOOSBALL_MATCH, team1: [...FOOSBALL_MATCH.team1, TONDA_PLAYER, TONDA_PLAYER],
    }],
    [ 'with too big team 2', {
      ...FOOSBALL_MATCH, team2: [...FOOSBALL_MATCH.team2, TONDA_PLAYER],
    }],
  ])('can not be constructed %s', (desc, data) => {
    expect(() => new Match(
      data.team1,
      data.team2,
      data.team1Won,
      data.date,
      data.winningTeamRatingChange,
      data.losingTeamRatingChange,
      data.gameId,
    )).toThrow(InputError)
  })
  it('can be constructed with valid data', () => {
    expect(new Match(
      FOOSBALL_MATCH.team1,
      FOOSBALL_MATCH.team2,
      FOOSBALL_MATCH.team1Won,
      FOOSBALL_MATCH.date,
      FOOSBALL_MATCH.winningTeamRatingChange,
      FOOSBALL_MATCH.losingTeamRatingChange,
      FOOSBALL_MATCH.gameId,
    )).toEqual(FOOSBALL_MATCH)
  })
})

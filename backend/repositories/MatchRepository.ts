import * as storage from '../storage/Storage'
import * as ratingCalculator from '../rating/rating-calculator'
import { InputError } from '../errors/InputError'
import { NotFoundError } from '../errors/NotFoundError'
import { Match } from '../types/Match'
import { RatingChanges } from '../types/RatingChanges'
import { MatchDescription, isMatchDescription } from '../types/MatchDescription'
import { Player } from '../types/Player'
import { oneLine } from 'common-tags'

const ADD_MATCH_COOLDOWN = process.env.ADD_MATCH_COOLDOWN || 60

const getFilledTeam = async (playedIds: Array<number>): Promise<Array<Player>> => {
  try {
    return await Promise.all(playedIds.map(storage.getPlayerById))
  } catch (error) {
    console.error(error)
    if (error instanceof NotFoundError) {
      throw new InputError(`Invalid players for the match (${error.message})`)
    }
    throw new Error('Unable to fetch players for match.')
  }
}

const getRatingChanges = (team1: Player[], team2: Player[], team1Won: boolean): RatingChanges => {
  const winningTeam = team1Won ? team1 : team2
  const losingTeam = team1Won ? team2 : team1

  return ratingCalculator.computeRatingChanges(winningTeam, losingTeam)
}

const constructMatch = async (gameId: number, matchDescription: MatchDescription):
Promise<Match> => {
  const team1 = await getFilledTeam(matchDescription.team1)
  const team2 = await getFilledTeam(matchDescription.team2)
  const {
    winningTeamRatingChange,
    losingTeamRatingChange,
  } = getRatingChanges(team1, team2, matchDescription.team1Won)
  const date = new Date()
  return new Match(
    team1,
    team2,
    matchDescription.team1Won,
    date,
    winningTeamRatingChange,
    losingTeamRatingChange,
    gameId
  )
}

const getElapsedSecondsSinceLatestMatch = async (gameId: number): Promise<number|null> => {
  const latestMatch = await storage.getLatestMatchByGameId(gameId)
  if (latestMatch == null) {
    return null
  }

  const currentTime = Date.now()
  const timeDiffSec = Math.round((currentTime - latestMatch.date.getTime()) / 1000)
  return timeDiffSec
}

/**
  * @param matchDescription Description of the match to record.
  * @param {Array<number>} matchDescription.team1 Array of 1 or 2 elements containing IDs of players from team1.
  * @param {Array<number>} matchDescription.team2 Array of 1 or 2 elements containing IDs of players from team2.
  * @param {boolean} matchDescription.team1Won True if team1 won, false if team2 won.
  */
export const recordMatch = async (gameName: string, matchDescription: unknown):
Promise<Match> => {
  if (!isMatchDescription(matchDescription)) {
    throw new InputError('Match data is not valid!')
  }
  const game = await storage.getGameByName(gameName)
  const elapsedTime = await getElapsedSecondsSinceLatestMatch(game.id)
  if (elapsedTime != null && elapsedTime < ADD_MATCH_COOLDOWN) {
    throw new InputError(oneLine`
      Can't add match ${elapsedTime} seconds after the last one.
      Minimum time is ${ADD_MATCH_COOLDOWN}.
    `)
  }

  const match = await constructMatch(game.id, matchDescription)
  await storage.storeMatch(match)

  return match
}

import * as storage from '../storage/Storage'
import * as ratingCalculator from '../rating/rating-calculator'
import { InputError } from '../errors/InputError'
import { NotFoundError } from '../errors/NotFoundError'
import { MatchWithId, Match } from '../types/Match'
import { User } from '../types/User'
import { RatingChanges } from '../types/RatingChanges'

const ADD_MATCH_COOLDOWN = process.env.ADD_MATCH_COOLDOWN || 60

const updateRatingForTeam = async (team, difference, storageContext): Promise<void> => {
  await Promise.all(team.map(player => {
    const newRating = player.rating + difference
    return storageContext.updateRatingForUser(player.id, newRating)
  }))
}

const storeMatch = async (match): Promise<MatchWithId> => {
  const winningTeam = match.team1Won ? match.team1 : match.team2
  const losingTeam = match.team1Won ? match.team2 : match.team1

  const storageContext = await storage.makeStorageContext()

  let result
  try {
    result = await storageContext.insertMatch(match)

    await updateRatingForTeam(winningTeam, match.winningTeamRatingChange, storageContext)
    await updateRatingForTeam(losingTeam, match.losingTeamRatingChange, storageContext)

    await storageContext.commit()
  } catch (error) {
    await storageContext.rollback()
    throw error
  }

  return result
}

const getFilledTeam = async (playedIds: Array<number>): Promise<Array<User>> => {
  try {
    return await Promise.all(playedIds.map(storage.getUser))
  } catch (error) {
    console.error(error)
    if (error instanceof NotFoundError) {
      throw new InputError(`Invalid players for the match (${error.message})`)
    }
    throw new Error('Unable to fetch players for match.')
  }
}

const getRatingChanges = ({ team1, team2 }, team1Won): RatingChanges => {
  const winningTeam = team1Won ? team1 : team2
  const losingTeam = team1Won ? team2 : team1

  return ratingCalculator.computeRatingChanges(winningTeam, losingTeam)
}

const constructMatch = async (matchDescription): Promise<Match> => {
  const teams = {
    team1: await getFilledTeam(matchDescription.team1),
    team2: await getFilledTeam(matchDescription.team2),
  }
  const {
    winningTeamRatingChange,
    losingTeamRatingChange,
  } = getRatingChanges(teams, matchDescription.team1Won)
  const date = new Date()
  return new Match(
    teams,
    matchDescription.team1Won,
    date,
    winningTeamRatingChange,
    losingTeamRatingChange
  )
}

const getElapsedSecondsSinceLatestMatch = async (): Promise<number> => {
  const latestMatch = await storage.getLatestMatch()
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
export const recordMatch = async (matchDescription): Promise<Match> => {
  const elapsedTime = await getElapsedSecondsSinceLatestMatch()
  if (elapsedTime != null && elapsedTime < ADD_MATCH_COOLDOWN) {
    throw new InputError(`Can't add match ${elapsedTime} seconds after the last one. Minimum time is ${ADD_MATCH_COOLDOWN}.`)
  }

  const match = await constructMatch(matchDescription)
  await storeMatch(match)

  return match
}

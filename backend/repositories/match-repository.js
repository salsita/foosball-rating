const storage = require("../storage/storage")
const ratingCalculator = require("../rating/rating-calculator")
const { InputError } = require('../errors/input-error')
const { ConflictError } = require('../errors/conflict-error')

const updateRatingForTeam = async (team, difference) => {
    await Promise.all(team.map(player => {
        const newRating = player.rating + difference
        return storage.updateRatingForUser(player.id, newRating)  
    }))
}

const fillPlayersForMatch = async (match) => {
    const filledTeam1 = await Promise.all(match.team1.map(storage.getUser))
    const filledTeam2 = await Promise.all(match.team2.map(storage.getUser))

    return {
        ...match,
        team1: filledTeam1,
        team2: filledTeam2
    }
}

const fillDateForMatch = (match) => ({ ...match, date: new Date() })

const recordFilledMatch = async (filledMatch) => {
    const winningTeam = filledMatch.team1Won ? filledMatch.team1 : filledMatch.team2
    const losingTeam = filledMatch.team1Won ? filledMatch.team2 : filledMatch.team1

    const ratingChange = ratingCalculator.computeRatingChange(winningTeam, losingTeam)

    const result = await storage.insertMatch(filledMatch)
    
    await updateRatingForTeam(winningTeam, ratingChange)
    await updateRatingForTeam(losingTeam, 0 - ratingChange)
    
    return result
}

/**
  * @param match Description of the match to record.
  * @param {Array<number>} match.team1 Array of 1 or 2 elements containing IDs of players from team1.
  * @param {Array<number>} match.team2 Array of 1 or 2 elements containing IDs of players from team2.
  * @param {boolean} match.team1Won True if team1 won, false if team2 won.
  */
exports.recordMatch = async (match) => {
    const matchWithDate = fillDateForMatch(match)

    let filledMatch
    try {
        filledMatch = await fillPlayersForMatch(matchWithDate)
    } catch (error) {
        console.error(error)
        throw new InputError("Unable to find players for match.")
    }

    return await recordFilledMatch(filledMatch)
}

const storage = require("../storage/storage")
const ratingCalculator = require("../rating/rating-calculator")
const { InputError } = require('../errors/input-error')
const { NotFoundError } = require('../errors/not-found-error')

const updateRatingForTeam = async (team, difference) => {
    await Promise.all(team.map(player => {
        const newRating = player.rating + difference
        return storage.updateRatingForUser(player.id, newRating)  
    }))
}

const storeMatch = async (match) => {
    const result = await storage.insertMatch(match)
    
    const winningTeam = match.team1Won ? match.team1 : match.team2
    const losingTeam = match.team1Won ? match.team2 : match.team1

    await updateRatingForTeam(winningTeam, match.ratingChange)
    await updateRatingForTeam(losingTeam, -match.ratingChange)
    
    return result
}

const getFilledTeam = async (playedIds) => {
    try {
        return await Promise.all(playedIds.map(storage.getUser))
    } catch (error) {
        console.error(error)
        if (error instanceof NotFoundError) {
            throw new InputError(`Invalid players for the match (${error.message})`)
        }
        throw new Error("Unable to fetch players for match.")
    }
}

const getRatingChange = ({team1, team2}, team1Won) => {
    const winningTeam = team1Won ? team1 : team2
    const losingTeam = team1Won ? team2 : team1

    return ratingChange = ratingCalculator.computeRatingChange(winningTeam, losingTeam)
}

class Match {
    constructor({team1, team2}, team1Won, date, ratingChange) {
        this.team1 = team1
        this.team2 = team2
        this.team1Won = team1Won
        this.date = date
        this.ratingChange = ratingChange
    }
}

const constructMatch = async (matchDescription) => {
    const teams = {
        team1: await getFilledTeam(matchDescription.team1),
        team2: await getFilledTeam(matchDescription.team2),
    }
    const ratingChange = getRatingChange(teams, matchDescription.team1Won)
    const date = new Date()
    return new Match(teams, matchDescription.team1Won, date, ratingChange)
}

/**
  * @param matchDescription Description of the match to record.
  * @param {Array<number>} matchDescription.team1 Array of 1 or 2 elements containing IDs of players from team1.
  * @param {Array<number>} matchDescription.team2 Array of 1 or 2 elements containing IDs of players from team2.
  * @param {boolean} matchDescription.team1Won True if team1 won, false if team2 won.
  */
exports.recordMatch = async (matchDescription) => {
    const match = await constructMatch(matchDescription)
    return await storeMatch(match)
}

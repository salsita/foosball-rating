const storage = require("../storage/storage")
const ratingCalculator = require("../rating/rating-calculator")
const { InputError } = require('../errors/input-error')
const { NotFoundError } = require('../errors/not-found-error')
const matchReporter = require("../bot/matchReporter")

const ADD_MATCH_COOLDOWN = process.env.ADD_MATCH_COOLDOWN || 60

const updateRatingForTeam = async (team, difference, storageContext) => {
    await Promise.all(team.map(player => {
        const newRating = player.rating + difference
        return storageContext.updateRatingForUser(player.id, newRating)  
    }))
}

const storeMatch = async (match) => {
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

const getRatingChanges = ({team1, team2}, team1Won) => {
    const winningTeam = team1Won ? team1 : team2
    const losingTeam = team1Won ? team2 : team1

    return ratingCalculator.computeRatingChanges(winningTeam, losingTeam)
}

class Match {
    constructor({team1, team2}, team1Won, date, winningTeamRatingChange, losingTeamRatingChange) {
        this.team1 = team1
        this.team2 = team2
        this.team1Won = team1Won
        this.date = date
        this.winningTeamRatingChange = winningTeamRatingChange
        this.losingTeamRatingChange = losingTeamRatingChange
    }
}

const constructMatch = async (matchDescription) => {
    const teams = {
        team1: await getFilledTeam(matchDescription.team1),
        team2: await getFilledTeam(matchDescription.team2),
    }
    const { winningTeamRatingChange, losingTeamRatingChange } = getRatingChanges(teams, matchDescription.team1Won)
    const date = new Date()
    return new Match(teams, matchDescription.team1Won, date, winningTeamRatingChange, losingTeamRatingChange)
}

const getElapsedSecondsSinceLatestMatch = async () => {
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
  * @param {SingleChannelBot?} bot Optional, slackbot
  */
exports.recordMatch = async (matchDescription, bot) => {
    const elapsedTime = await getElapsedSecondsSinceLatestMatch()
    if (elapsedTime != null && elapsedTime < ADD_MATCH_COOLDOWN) {
        throw new InputError(`Can't add match ${elapsedTime} seconds after the last one. Minimum time is ${ADD_MATCH_COOLDOWN}.`)
    }

    const oldUsers = await storage.getAllUsers()
    const match = await constructMatch(matchDescription)
    const result = await storeMatch(match)
    const newUsers = await storage.getAllUsers()

    if (bot) {
        try {
            await matchReporter.reportMatchOnSlack(bot, match, oldUsers, newUsers)
        } catch (error) {
            console.log('Bot error', error)
        }
    }

    return result
}

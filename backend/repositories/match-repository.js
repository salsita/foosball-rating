const storage = require("./storage/storage.js")
const ratingCalculator = require("./rating-calculator.js")

const changeRating = (team, difference) => {
    team.forEach(player => {
        const newRating = player.currentRating + difference
        storage.updateCurrentRatingForUser(player.id, newRating)  
    })
}

const buildMatchRecord = (team1, team2, team1Won) => {
    const date = new Date()

    return {
        team1: {
            player1: team1[0],
            player2: team1[1]
        },
        team2: {
            player1: team2[0],
            player2: team2[1]
        },
        date,
        team1Won
    }
}

exports.recordMatch = async (match) => {
    const team1 = [await storage.getUser(match.team1.player1Id), await storage.getUser(match.team1.player2Id)]
    const team2 = [await storage.getUser(match.team2.player1Id), await storage.getUser(match.team2.player2Id)]

    const winningTeam = match.team1Won ? team1 : team2
    const losingTeam = match.team1Won ? team2 : team1

    const ratingChange = ratingCalculator.computeRating(winningTeam, losingTeam)

    const result = storage.addMatchRecord(buildMatchRecord(team1, team2, match.team1Won))

    changeRating(winningTeam, ratingChange)
    changeRating(losingTeam, 0 - ratingChange)

    return result
}
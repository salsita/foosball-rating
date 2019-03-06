const storage = require("../storage/storage")
const ratingCalculator = require("../rating/rating-calculator")

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

exports.recordMatch = async (match) => {
    const matchWithDate = fillDateForMatch(match)
    const filledMatch = await fillPlayersForMatch(matchWithDate)

    const winningTeam = filledMatch.team1Won ? filledMatch.team1 : filledMatch.team2
    const losingTeam = filledMatch.team1Won ? filledMatch.team2 : filledMatch.team1

    const ratingChange = ratingCalculator.computeRatingChange(winningTeam, losingTeam)

    const result = storage.insertMatch(filledMatch)

    await updateRatingForTeam(winningTeam, ratingChange)
    await updateRatingForTeam(losingTeam, 0 - ratingChange)

    return result
}

exports.createUserFromDbRow = (userRow) => ({
    id: userRow.Id,
    name: userRow.Name,
    rating: userRow.Rating,
    active: userRow.Active,
    initialRating: userRow.InitialRating
})

exports.createMatchFromDbRow = (matchRow) => {
    const team1Player2Array = matchRow.Team1Player2Id ? [{
        id: matchRow.Team1Player2Id,
        matchRating: matchRow.Team1Player2Rating
    }] : []

    const team2Player2Array = matchRow.Team2Player2Id ? [{
        id: matchRow.Team2Player2Id,
        matchRating: matchRow.Team2Player2Rating
    }] : []
    
    return {
        id: matchRow.Id,
        team1: [ { id: matchRow.Team1Player1Id, matchRating: matchRow.Team1Player1Rating }, ...team1Player2Array],
        team2: [ { id: matchRow.Team2Player1Id, matchRating: matchRow.Team2Player1Rating }, ...team2Player2Array],
        date: matchRow.Date,
        winningTeamRatingChange: matchRow.WinningTeamRatingChange,
        losingTeamRatingChange: matchRow.LosingTeamRatingChange,
        team1Won: matchRow.Team1Won
    }
}

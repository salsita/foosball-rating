exports.createUserFromDbRow = (userRow) => ({
    id: Number(userRow.Id),
    name: userRow.Name,
    rating: Number(userRow.Rating),
    active: Boolean(userRow.Active),
    initialRating: Number(userRow.InitialRating)
})

exports.createMatchFromDbRow = (matchRow) => {
    const team1Player2Array = matchRow.Team1Player2Id ? [{
        id: Number(matchRow.Team1Player2Id),
        matchRating: Number(matchRow.Team1Player2Rating)
    }] : []

    const team2Player2Array = matchRow.Team2Player2Id ? [{
        id: Number(matchRow.Team2Player2Id),
        matchRating: Number(matchRow.Team2Player2Rating)
    }] : []
    
    return {
        id: Number(matchRow.Id),
        team1: [ 
            { 
                id: Number(matchRow.Team1Player1Id), 
                matchRating: Number(matchRow.Team1Player1Rating) 
            }, 
            ...team1Player2Array
        ],
        team2: [ 
            { 
                id: Number(matchRow.Team2Player1Id), 
                matchRating: Number(matchRow.Team2Player1Rating) 
            }, 
            ...team2Player2Array
        ],
        date: matchRow.Date,
        winningTeamRatingChange: Number(matchRow.WinningTeamRatingChange),
        losingTeamRatingChange: Number(matchRow.LosingTeamRatingChange),
        team1Won: Boolean(matchRow.Team1Won)
    }
}

exports.makeUserFromDbType = (userRecord) => ({
    id: userRecord.UserID,
    name: userRecord.Name,
    currentRating: userRecord.CurrentRating,
    active: userRecord.Active,
    initialRating: userRecord.InitialRating
})

exports.makeMatchRecordFromDbType = (matchRecord) => ({
    team1: {
        player1: {
            id: matchRecord.Team1Player1ID,
            rating: matchRecord.Team1Player1Rating
        },
        player2: {
            id: matchRecord.Team1Player2ID,
            rating: matchRecord.Team1Player2Rating
        }
    },
    team2: {
        player1: {
            id: matchRecord.Team2Player1ID,
            rating: matchRecord.Team2Player1Rating
        },
        player2: {
            id: matchRecord.Team2Player2ID,
            rating: matchRecord.Team2Player2Rating
        }
    },
    date: matchRecord.Date,
    team1Won: matchRecord.Team1Won
})
import { QueryResultRow } from 'pg';
import { MatchWithId } from '../../types/Match';
import { Player } from '../../types/Player';

export const createPlayerFromDbRow = (playerRow: QueryResultRow): Player => ({
  id: playerRow.Id,
  name: playerRow.Name,
  rating: playerRow.Rating,
  active: playerRow.Active,
  initialRating: playerRow.InitialRating,
});

export const createMatchFromDbRow = (matchRow: QueryResultRow): MatchWithId => {
  const team1Player2Array = matchRow.Team1Player2Id ? [{
    id: Number(matchRow.Team1Player2Id),
    name: matchRow.Team1Player2Name,
    rating: Number(matchRow.Team1Player2Rating),
  }] : [];

  const team2Player2Array = matchRow.Team2Player2Id ? [{
    id: Number(matchRow.Team2Player2Id),
    name: matchRow.Team2Player2Name,
    rating: Number(matchRow.Team2Player2Rating),
  }] : [];

  return new MatchWithId(
    matchRow.Id,
    [
      {
        id: Number(matchRow.Team1Player1Id),
        name: matchRow.Team1Player1Name,
        rating: Number(matchRow.Team1Player1Rating),
      }
      , ...team1Player2Array
    ],
    [{
      id: matchRow.Team2Player1Id,
      name: matchRow.Team2Player1Name,
      rating: matchRow.Team2Player1Rating,
    }, ...team2Player2Array],
    matchRow.Date,
    matchRow.WinningTeamRatingChange,
    matchRow.LosingTeamRatingChange,
    matchRow.Team1Won,
  );
};

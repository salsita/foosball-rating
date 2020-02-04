import { Player, PlayerToCreate } from '../types/Player';
import { Match, MatchWithId } from '../types/Match';

export interface IStorageContextOperations {
  getAllPlayers(): Promise<Player[]>

  getPlayer(playerId: number): Promise<Player>

  updateRatingForPlayer(playerId: number, newRating: number): Promise<Player>

  insertPlayer(player: PlayerToCreate): Promise<Player>

  insertMatch(match: Match): Promise<Match>

  getAllMatches(): Promise<MatchWithId[]>

  getLatestMatch(): Promise<MatchWithId | null>

}

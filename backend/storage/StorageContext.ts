import { QueryResultRow } from 'pg';

import { PlayerInMatches, PlayerToCreate } from '../types/Player';
import { Match } from '../types/Match';
import { storageContextHelpers } from '../helpers/storage-context-helpers';
import { IStorageContext } from './IStorageContext';

import { ITransaction } from './db/db-transactions';
import * as dbTransformations from './db/db-transformations';
import * as dbQueries from './db/db-queries'
import * as dbErrors from './db/db-errors'
import { ConflictError } from '../errors/ConflictError';
import { NotFoundError } from '../errors/NotFoundError';
import { InputError } from '../errors/InputError';

export class StorageContext implements IStorageContext {
  constructor(private transaction: ITransaction) {
    this.transaction = transaction;
  }

  async commit() {
    try {
      await this.transaction.commit();
    } catch (error) {
      console.error(error);
      throw new Error('Unable to commit transaction');
    }
  }

  async rollback() {
    await this.transaction.rollback();
  }

  async getAllPlayers() {
    let rows;
    try {
      rows = await this.transaction.executeQuery(dbQueries.selectAllusers, []);
    } catch (error) {
      console.error(error);
      throw new Error('Unable to retrieve users');
    }

    return rows.map(dbTransformations.createPlayerFromDbRow);
  }

  async getPlayer(playerId: number) {
    const query = dbQueries.selectUser;
    const values = storageContextHelpers.toStringParams(playerId);

    let row;
    try {
      row = await this.transaction.executeSingleResultQuery(query, values);
    } catch (error) {
      console.error(error);
      throw new Error('Unable to fetch user');
    }

    if (!row) {
      throw new NotFoundError(`User ${playerId} doesn't exist`);
    }

    return dbTransformations.createPlayerFromDbRow(row);
  }

  async updateRatingForPlayer(playerId: number, newRating: number) {
    const query = dbQueries.updateRatingForUser;
    const values = storageContextHelpers.toStringParams(newRating, playerId);

    let row;
    try {
      row = await this.transaction.executeSingleResultQuery(query, values);
    } catch (error) {
      console.error(error);
      throw new Error('Unable to update rating for user');
    }

    if (!row) {
      throw new NotFoundError(`User ${playerId} doesn't exist`);
    }

    return dbTransformations.createPlayerFromDbRow(row);
  }

  async insertPlayer(player: PlayerToCreate) {
    const query = dbQueries.insertUser;
    const values = storageContextHelpers.toStringParams(player.name, player.initialRating, true, player.initialRating);

    let row: QueryResultRow;
    try {
      row = await this.transaction.executeSingleResultQuery(query, values);
    } catch (error) {
      console.error(error);
      if (dbErrors.isUniqueViolation(error)) {
        throw new ConflictError(`User ${player.name} already exists`);
      }
      throw new Error('Unable to add user');
    }

    return dbTransformations.createPlayerFromDbRow(row);
  }

  async insertMatch(match: Match) {
    const isTeamSizeSupported = (team: PlayerInMatches[]) => team.length >= 1 && team.length <= 2;
    if (!isTeamSizeSupported(match.team1) || !isTeamSizeSupported(match.team2)) {
      throw new InputError('Inserting teams with unsupported number of players');
    }

    const team1Player1 = match.team1[0];
    const team1Player2 = match.team1[1] || {};
    const team2Player1 = match.team2[0];
    const team2Player2 = match.team2[1] || {};

    const query = dbQueries.insertMatch;
    const values = storageContextHelpers.toStringParams(team1Player1.id, team1Player1.rating, team1Player2.id, team1Player2.rating,
      team2Player1.id, team2Player1.rating, team2Player2.id, team2Player2.rating,
      match.date, match.winningTeamRatingChange, match.losingTeamRatingChange, match.team1Won);

    let row: QueryResultRow;
    try {
      row = await this.transaction.executeSingleResultQuery(query, values);
    } catch (error) {
      console.error(error);
      throw new Error('Unable to create match');
    }

    return dbTransformations.createMatchFromDbRow(row);
  }

  async getAllMatches() {
    let rows: QueryResultRow[];
    try {
      rows = await this.transaction.executeQuery(dbQueries.selectAllMatches, []);
    } catch (error) {
      console.error(error);
      throw new Error('Unable to retrieve matches');
    }

    return rows.map(dbTransformations.createMatchFromDbRow);
  }

  async getLatestMatch() {
    let row;
    try {
      row = await this.transaction.executeSingleResultQuery(dbQueries.selectLatestMatch, []);
    } catch (error) {
      console.error(error);
      throw new Error('Unable to retrieve latest match');
    }

    return row != null ? dbTransformations.createMatchFromDbRow(row) : null;
  }
}

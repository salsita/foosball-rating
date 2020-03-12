/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('Users', {
    Id: { type: 'BIGSERIAL', notNull: true, primaryKey: true },
    Name: {
      type: 'text',
      notNull: true,
      unique: true,
    },
    Rating: { type: 'integer', notNull: true },
    Active: { type: 'boolean', notNull: true },
    InitialRating: { type: 'integer', notNull: true },
  })

  pgm.createTable('Matches', {
    Id: { type: 'BIGSERIAL', notNull: true, primaryKey: true },
    Team1Player1Id: { type: 'integer', notNull: true, references: 'Users', onDelete: 'RESTRICT' },
    Team1Player1Rating: { type: 'integer', notNull: true },
    Team1Player2Id: { type: 'integer', references: 'Users', onDelete: 'RESTRICT' },
    Team1Player2Rating: { type: 'integer' },
    Team2Player1Id: { type: 'integer', notNull: true, references: 'Users', onDelete: 'RESTRICT' },
    Team2Player1Rating: { type: 'integer', notNull: true },
    Team2Player2Id: { type: 'integer', references: 'Users', onDelete: 'RESTRICT' },
    Team2Player2Rating: { type: 'integer' },
    Date: { type: 'timestamp without time zone', notNull: true },
    WinningTeamRatingChange: { type: 'integer', notNull: true },
    LosingTeamRatingChange: { type: 'integer', notNull: true },
    Team1Won: { type: 'boolean', notNull: true },
  })
}

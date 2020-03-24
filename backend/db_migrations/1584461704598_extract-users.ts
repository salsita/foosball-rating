/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.renameTable('Users', 'Players')
  pgm.createTable('Users', {
    Id: 'id',
    Name: {
      type: 'text',
      notNull: true,
      unique: true,
    },
    Active: { type: 'boolean', notNull: true },
    // helper column to copy Users.id to Players.UserId, to be dropped after
    PlayerId: { type: 'integer', references: 'Players' },
  })
  pgm.addColumns('Players', {
    UserId: { type: 'integer', references: 'Users', onDelete: 'RESTRICT' },
    GameId: { type: 'integer', references: 'Games', onDelete: 'RESTRICT' },
  })
  pgm.addConstraint('Players', 'UserId_GameId_UQ', { unique: ['UserId', 'GameId'] })
}

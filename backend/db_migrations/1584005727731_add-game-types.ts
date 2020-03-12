/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('Games', {
    Id: 'id',
    Name: { type: 'string', notNull: true, unique: true },
    Description: { type: 'string', notNull: true },
  })

  pgm.addColumn('Matches', {
    GameId: { type: 'integer', references: 'Games', onDelete: 'RESTRICT' },
  })
}

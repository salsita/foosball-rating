/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.dropColumns('Players', ['Name', 'Active'])
  pgm.dropColumns('Users', ['PlayerId'])
  pgm.alterColumn('Players', 'GameId', {
    notNull: true,
  })
  pgm.alterColumn('Players', 'UserId', {
    notNull: true,
  })
}

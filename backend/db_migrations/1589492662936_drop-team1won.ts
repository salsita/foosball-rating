/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.dropColumns('Matches', ['Team1Won'])
  pgm.alterColumn('Matches', 'Team1Score', {
    notNull: true,
  })
  pgm.alterColumn('Matches', 'Team2Score', {
    notNull: true,
  })
}

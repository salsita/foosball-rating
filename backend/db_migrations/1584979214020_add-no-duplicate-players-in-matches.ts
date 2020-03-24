/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate'
import { oneLine } from 'common-tags'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.addConstraint('Matches', 'NO_DUPLICATE_PLAYERS_IN_TEAM_1', {
    check: '"Team1Player1Id" != "Team1Player2Id"',
  })
  pgm.addConstraint('Matches', 'NO_DUPLICATE_PLAYERS_IN_TEAM_2', {
    check: '"Team2Player1Id" != "Team2Player2Id"',
  })
  pgm.addConstraint('Matches', 'NO_DUPLICATE_PLAYERS_IN_MATCHES', {
    check: oneLine`
      "Team1Player1Id" != "Team2Player1Id" AND
      "Team1Player1Id" != "Team2Player2Id" AND
      "Team1Player2Id" != "Team2Player1Id" AND
      "Team1Player2Id" != "Team2Player2Id"
    `,
  })
}

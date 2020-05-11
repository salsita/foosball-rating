import { SingleChannelBot } from '../bot/bot-factory'
import { MatchReportDecoration, EMPTY_DECORATION } from '../types/MatchReportDecoration'
import { Player } from '../types/Player'
import { Match } from '../types/Match'

const DEFAULT_LEADERBOARD_SIZE = 5

const parseMatchReportDecorations =
(config: string | undefined): Array<MatchReportDecoration> => config
  ? config.split(';').map(configPart => {
    const splitConfigPart = configPart.split(',')
    if (splitConfigPart.length !== 4) {
      throw Error(`Could not parse config part "${splitConfigPart}"`)
    }
    return ({
      player1: splitConfigPart[0],
      player2: splitConfigPart[1],
      prefix: splitConfigPart[2],
      suffix: splitConfigPart[3],
    })
  })
  : []

const createRankingChangeMessage = (oldRankings: Player[], newRankings: Player[]): string => {
  const rankingChanges = oldRankings
    .map((oldPlayer, index) => ({
      name: oldPlayer.name,
      oldRanking: index + 1,
      newRanking: newRankings.findIndex(p => p.id === oldPlayer.id) + 1,
    }))
    .filter(ranking => ranking.oldRanking != ranking.newRanking)

  if (rankingChanges.length === 0) {
    return ''
  }

  return rankingChanges
    .map(c => (
      `${c.name} ${c.oldRanking}. ⟶ ${c.newRanking}.`)
    )
    .join('\n')
}

const hasLeaderboardChanged =
(leaderboardSize: number, oldRankings: Player[], newRankings: Player[]): boolean => {
  return oldRankings.findIndex((oldPlayer, index) => {
    return oldPlayer.id !== newRankings[index].id
  }) < leaderboardSize
}

const getDecorationsForTeam = (team: Player[], decorations: Array<MatchReportDecoration>):
MatchReportDecoration => {
  for (const decoration of decorations) {
    if (team.every(player => player.name === decoration.player1 ||
        player.name === decoration.player2)) {
      return decoration
    }
  }
  return EMPTY_DECORATION
}

const createMatchResultMessage = (match: Match, decorations: MatchReportDecoration[]): string => {
  const { team1, team2, team1Won, winningTeamRatingChange, losingTeamRatingChange } = match
  let winningTeam, losingTeam
  if (team1Won) {
    [winningTeam, losingTeam] = [team1, team2]
  } else {
    [winningTeam, losingTeam] = [team2, team1]
  }
  const winningPlayers = winningTeam.map(player => `${player.name} (${player.rating})`)
  const losingPlayers = losingTeam.map(player => `${player.name} (${player.rating})`)

  const messageParts = []

  const { prefix, suffix } = decorations && winningTeam.length === 2
    ? getDecorationsForTeam(winningTeam, decorations)
    : EMPTY_DECORATION

  if (prefix) {
    messageParts.push(prefix)
  }

  if (winningTeam.length === losingTeam.length) {
    if (winningTeamRatingChange <= 10) {
      messageParts.push('Easy.')
    } else if (winningTeamRatingChange >= 20) {
      messageParts.push(`HOLY SHIT! L2P, ${losingTeam.length > 1 ? 'noobs' : 'noob'}!`)
    }
  }

  messageParts.push(`${winningPlayers.join(', ')} just beat ${losingPlayers.join(', ')}.`)
  messageParts.push(`Each winner gets ${winningTeamRatingChange} points, each loser loses ${-losingTeamRatingChange} points.`)

  if (suffix) {
    messageParts.push(suffix)
  }

  return messageParts.join(' ')
}

const ratingComparator = (a: Player, b: Player): number => b.rating - a.rating

const createPurposeMessage = async (rankings: Player[]): Promise<string> => {
  const rankingsText = rankings
    .map((ranking, i) => `${i + 1}. ${ranking.name} (${ranking.rating})`)
    .join('\n')
  const purpose = 'TOP PLAYERS\n' + rankingsText
  return purpose
}

export class MatchReporter {
  readonly decorations: MatchReportDecoration[]
  constructor(
    readonly bot: SingleChannelBot,
    matchReportPrefixSuffixConfig: string | undefined,
    readonly leaderboardSize = DEFAULT_LEADERBOARD_SIZE
  ) {
    try {
      this.decorations = parseMatchReportDecorations(matchReportPrefixSuffixConfig)
    } catch (e) {
      console.warn(`Parsing matchReportPrefixSuffixConfig failed: ${e.message}`)
      this.decorations = []
    }
  }

  async reportMatchOnSlack(match: Match, oldPlayers: Player[], newPlayers: Player[]):
  Promise<void> {
    const matchResultMessage = createMatchResultMessage(match, this.decorations)

    const oldRankings = oldPlayers.sort(ratingComparator)
    const newRankings = newPlayers.sort(ratingComparator)

    const rankingChangeMessage = createRankingChangeMessage(oldRankings, newRankings)
    await this.bot.postMessage(`${matchResultMessage}\n${rankingChangeMessage}`)
    const shouldUpdatePurpose = hasLeaderboardChanged(
      this.leaderboardSize,
      oldRankings,
      newRankings
    )
    if (shouldUpdatePurpose) {
      const purposeMessage = await createPurposeMessage(newRankings.slice(0, this.leaderboardSize))
      await this.bot.setGroupPurpose(purposeMessage)
    }
  }
}

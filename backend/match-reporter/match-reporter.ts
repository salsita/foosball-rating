import { Player, PlayerInMatches } from '../types/Player';
import { Match } from '../types/Match';

const DEFAULT_LEADERBOARD_SIZE = 5;

interface Decorations {
  player1?: string,
  player2?: string,
  prefix?: string,
  suffix?: string,
}

export class MatchReporter {
  readonly bot: any;
  readonly leaderboardSize: number;
  readonly decorations: Decorations;

  constructor(bot: any, matchReportPrefixSuffixConfig: string, leaderboardSize = DEFAULT_LEADERBOARD_SIZE) {
    this.bot = bot;
    this.leaderboardSize = leaderboardSize;

    try {
      this.decorations = parseMatchReportDecorations(matchReportPrefixSuffixConfig);
    } catch (e) {
      console.warn(`Parsing matchReportPrefixSuffixConfig failed: ${e.message}`);
    }
  }

  async reportMatchOnSlack(match: Match, oldPlayers: Player[], newPlayers: Player[]) {
    const matchResultMessage = createMatchResultMessage(match, this.decorations);

    const oldRankings = oldPlayers.sort(ratingComparator);
    const newRankings = newPlayers.sort(ratingComparator);

    const rankingChangeMessage = createRankingChangeMessage(oldRankings, newRankings);
    await this.bot.postMessage(`${matchResultMessage}\n${rankingChangeMessage}`);
    const shouldUpdatePurpose = hasLeaderboardChanged(this.leaderboardSize, oldRankings, newRankings);
    if (shouldUpdatePurpose) {
      const purposeMessage = await createPurposeMessage(newRankings.slice(0, this.leaderboardSize));
      await this.bot.setGroupPurpose(purposeMessage);
    }
  }
}

const ratingComparator = (a: Player, b: Player) => b.rating - a.rating;

const parseMatchReportDecorations = (config: string) => config
  ? config.split(';').map((configPart: string) => {
    const splitConfigPart = configPart.split(',');
    if (splitConfigPart.length !== 4) {
      throw Error(`Could not parse config part "${splitConfigPart}"`);
    }
    return ({
      player1: splitConfigPart[0],
      player2: splitConfigPart[1],
      prefix: splitConfigPart[2],
      suffix: splitConfigPart[3],
    });
  })
  : {};

const createMatchResultMessage = (match: Match, decorations: any) => {
  const { team1, team2, team1Won, winningTeamRatingChange, losingTeamRatingChange } = match;
  let winningTeam, losingTeam;
  if (team1Won) {
    [winningTeam, losingTeam] = [team1, team2];
  } else {
    [winningTeam, losingTeam] = [team2, team1];
  }
  const winningPlayers = winningTeam.map((player) => `${player.name} (${player.rating})`);
  const losingPlayers = losingTeam.map((player) => `${player.name} (${player.rating})`);

  const messageParts = [];

  const { prefix = null, suffix = null } = decorations && winningTeam.length === 2
    ? getDecorationsForTeam(winningTeam, decorations)
    : {};

  if (prefix) {
    messageParts.push(prefix);
  }

  if (winningTeam.length === losingTeam.length) {
    if (winningTeamRatingChange <= 10) {
      messageParts.push('Easy.');
    } else if (winningTeamRatingChange >= 20) {
      messageParts.push(`HOLY SHIT! L2P, ${losingTeam.length > 1 ? 'noobs' : 'noob'}!`);
    }
  }

  messageParts.push(`${winningPlayers.join(', ')} just beat ${losingPlayers.join(', ')}.`);
  messageParts.push(`Each winner gets ${winningTeamRatingChange} points, each loser loses ${-losingTeamRatingChange} points.`);

  if (suffix) {
    messageParts.push(suffix);
  }

  return messageParts.join(' ');
};

const getDecorationsForTeam = (team: PlayerInMatches[], decorations: any) => {
  for (let decoration of decorations) {
    if (team.every((player) => player.name === decoration.player1 || player.name === decoration.player2)) {
      return decoration;
    }
  }
  return {};
};

const createRankingChangeMessage = (oldRankings: Player[], newRankings: Player[]) => {
  const rankingChanges = oldRankings
    .map((oldPlayer: Player, index: number) => ({
      name: oldPlayer.name,
      oldRanking: index + 1,
      newRanking: newRankings.findIndex((p) => p.id === oldPlayer.id) + 1
    }))
    .filter((ranking) => ranking.oldRanking != ranking.newRanking);

  if (rankingChanges.length === 0) {
    return '';
  }

  return rankingChanges
    .map((c) => (
      `${c.name} ${c.oldRanking}. ⟶ ${c.newRanking}.`)
    )
    .join('\n');
};

const hasLeaderboardChanged = (leaderboardSize: number, oldRankings: Player[], newRankings: Player[]) => (
  oldRankings.findIndex((oldPlayer: Player, index: number) => oldPlayer.id !== newRankings[index].id) < leaderboardSize
);

const createPurposeMessage = async (rankings: Player[]) => {
  const rankingsText = rankings
    .map((ranking, i) => `${i + 1}. ${ranking.name} (${ranking.rating})`)
    .join('\n');
  return 'TOP PLAYERS\n' + rankingsText;
};


export class MatchReportDecoration {
  constructor(
    readonly player1: string,
    readonly player2: string,
    readonly prefix: string,
    readonly suffix: string
  ) {}
}

export const EMPTY_DECORATION = new MatchReportDecoration('', '', '', '')

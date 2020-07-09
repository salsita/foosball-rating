import React from 'react'

import { TextSpan, StatisticsTable } from '../../../styles/blocks'
import { RankRow } from './RankRow'
import { DateRow } from './DateRow'
import { PlayerRow } from './PlayerRow'

export const ProfileStatistics = props => {
  const {
    constructUrl,
    rankings: { ranking, scoreToNextRank, scoreToPevRank },
    statistics: {
      bestDay, worstDay,
      mostFrequentTeammate, leastFrequentTeammate, mostFrequentOpponent, leastFrequentOpponent,
      mostSuccessTeammate, leastSuccessTeammate, mostSuccessOpponent, leastSuccessOpponent,
    },
  } = props

  const rankRows = [
    [
      { label: 'To Next Rank', score: scoreToNextRank, sign: '+', positive: scoreToNextRank <= 20 },
      { label: 'To Prev Rank', score: scoreToPevRank, sign: '-', positive: scoreToPevRank > 20 },
    ],
  ]

  const dateRows = [
    [
      { label: 'Best Day', day: bestDay || {} },
      { label: 'Worst Day', day: worstDay || {} },
    ],
  ]

  const playerRows = [
    [
      { label: 'Most Played With', player: mostFrequentTeammate, positive: true },
      { label: 'Least Played With', player: leastFrequentTeammate, positive: false },
    ], [
      { label: 'Most Played Against', player: mostFrequentOpponent, positive: true },
      { label: 'Least Played Against', player: leastFrequentOpponent, positive: false },
    ], [
      { label: 'Most Won With', player: mostSuccessTeammate, positive: true },
      { label: 'Most Lost With', player: leastSuccessTeammate, positive: false },
    ], [
      { label: 'Most Won Over', player: mostSuccessOpponent, positive: true },
      { label: 'Most Lost To', player: leastSuccessOpponent, positive: false },
    ],
  ]

  return (
    <>
      <TextSpan>Ranking: {ranking}</TextSpan>
      <StatisticsTable>
        <tbody>
          {rankRows.map((row, index) => (
            <RankRow key={`rank_${index}`} row={row} index={index} />
          ))}
          {dateRows.map((row, index) => (
            <DateRow key={`date_${index}`} row={row} index={index} />
          ))}
          {playerRows.map((row, index) => (
            <PlayerRow key={`player_${index}`} row={row} constructUrl={constructUrl} index={index} />
          ))}
        </tbody>
      </StatisticsTable>
    </>
  )
}

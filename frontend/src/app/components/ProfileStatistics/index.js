import React from 'react'

import { TextSpan, StatisticsTable } from '../../../styles/blocks'
import { StatsRow } from './StatsRow'

export const ProfileStatistics = props => {
  const {
    rankings: { ranking, toNextRank, toPrevRank },
    statistics: {
      bestDay, worstDay,
      mostFrequentTeammate, leastFrequentTeammate, mostFrequentOpponent, leastFrequentOpponent,
      mostSuccessTeammate, leastSuccessTeammate, mostSuccessOpponent, leastSuccessOpponent,
    },
  } = props

  const rows = [
    [
      createRankRowObject('To Next Rank', toNextRank, '+', toNextRank <= 20),
      createRankRowObject('To Prev Rank', toPrevRank, '-', toPrevRank > 20),
    ], [
      createDateRowObject('Best Day', bestDay || {}),
      createDateRowObject('Worst Day', worstDay || {}),
    ], [
      createRowObject('Most Played With', mostFrequentTeammate, 'x', true),
      createRowObject('Least Played With', leastFrequentTeammate, 'x', false),
    ], [
      createRowObject('Most Played Against', mostFrequentOpponent, 'x', true),
      createRowObject('Least Played Against', leastFrequentOpponent, 'x', false),
    ], [
      createRowObject('Most Won With', mostSuccessTeammate, 'x', true),
      createRowObject('Most Lost With', leastSuccessTeammate, 'x', false),
    ], [
      createRowObject('Most Won Over', mostSuccessOpponent, 'x', true),
      createRowObject('Most Lost To', leastSuccessOpponent, 'x', false),
    ],
  ]

  return (
    <>
      <TextSpan>Ranking: {ranking}</TextSpan>
      <StatisticsTable>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((node, key) => (
                <StatsRow key={[index, key].join('_')}
                  text={node.text}
                  player={node.player}
                  score={node.score}
                  positive={node.positive}
                  altText={node.altText} />
              ))}
            </tr>
          ))}
        </tbody>
      </StatisticsTable>
    </>
  )
}

const createRowObject = (text, obj, sign, positive) => ({
  text,
  player: obj.value,
  score: `${obj.score}${sign}`,
  positive: positive,
})

const createDateRowObject = (text, obj) => ({
  text,
  altText: obj.value,
  score: `${obj.score > 0 ? '+' : ''}${obj.score}`,
  positive: obj.score > 0,
})

const createRankRowObject = (text, score, sign, positive) => ({
  text,
  score: `${sign}${score}`,
  positive: positive,
})

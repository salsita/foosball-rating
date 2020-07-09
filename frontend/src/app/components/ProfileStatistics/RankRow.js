import React from 'react'

import { StatisticsValue, StatsSpan } from '../../../styles/blocks'

export const RankRow = ({ row, index }) => (
  <tr key={index}>
    {row.map(({ label, score, sign, positive }, key) => (
      <td key={[index, key].join('_')}>{label}:
        <StatisticsValue>
          &nbsp;
          <StatsSpan positive={positive}>{score > 0 ? `${sign}${score}` : '-'}</StatsSpan>
        </StatisticsValue>
      </td>
    ))}
  </tr>
)

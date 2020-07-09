import React from 'react'

import { StatisticsValue, StatsSpan } from '../../../styles/blocks'

export const DateRow = ({ row, index }) => (
  <tr key={index}>
    {row.map(({ label, day }, key) => (
      <td key={[index, key].join('_')}>{label}:
        <StatisticsValue>
          {day.value}&nbsp;
          <StatsSpan positive={day.score > 0}>{(day.score > 0 ? '+' : '') + day.score}</StatsSpan>
        </StatisticsValue>
      </td>
    ))}
  </tr>
)

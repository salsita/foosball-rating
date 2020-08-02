import React from 'react'

import { StatisticsValue, StyledLink, StatsSpan } from '../../../styles/blocks'
import { createProfilePath } from '../../const/routes'

export const PlayerRow = ({ constructUrl, row, index }) => (
  <tr key={index}>
    {row.map(({ label, player: { score, value: { id, name, matchRating } }, positive }, key) => (
      <td key={[index, key].join('_')}>{label}:
        <StatisticsValue>
          <StyledLink key={id} to={constructUrl(createProfilePath(id))}>
            {name}&nbsp;<span>({matchRating})</span>
          </StyledLink>
          &nbsp;
          <StatsSpan positive={positive}>{score}x</StatsSpan>
        </StatisticsValue>
      </td>
    ))}
  </tr>
)

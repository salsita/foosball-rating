import React from 'react'

import { StatisticsValue, StyledLink, StatsSpan } from '../../../styles/blocks'
import { createProfilePath } from '../../const/routes'

export const StatsRow = ({ text, player, score, positive, altText = null }) => (
  <td key="">{text}:
    <StatisticsValue>
      {player ? (
        <StyledLink key={player?.id} to={createProfilePath(player?.id)}>
          {player?.name}&nbsp;<span>({player?.matchRating})</span>
        </StyledLink>
      ) : altText}&nbsp;
      {getScorePart(score, positive)}
    </StatisticsValue>
  </td>
)

const getScorePart = (score, positive) => (
  <StatsSpan positive={positive}>{score}</StatsSpan>
)

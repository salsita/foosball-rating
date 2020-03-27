import React from 'react'

import { TextSpan, StatisticsTable, StatisticsValue, StyledLink, WinnerSpan } from '../../../styles/blocks'
import { createProfilePath } from '../../const/routes'

export const ProfileStatistics = props => {
  const {
    rankings: { ranking, toNextRank, toPrevRank },
    statistics: {
      bestDay, worstDay, mostFrequentTeammate, leastFrequentTeammate, mostFrequentOpponent,
      leastFrequentOpponent, mostSuccessTeammate, leastSuccessTeammate, mostSuccessOpponent,
      leastSuccessOpponent,
    },
  } = props

  return (
    <>
      <TextSpan>Ranking: {ranking}</TextSpan>
      <StatisticsTable>
        <tbody>
          <tr>
            <td>To Next Rank:
              <StatisticsValue>{getScorePart(toNextRank, toNextRank <= 20, '+')}</StatisticsValue>
            </td>
            <td>To Prev Rank:
              <StatisticsValue>{getScorePart(toPrevRank, toPrevRank > 20, '-')}</StatisticsValue>
            </td>
          </tr>
          <tr>
            <td>Best Day:
              <StatisticsValue>{bestDay?.date} {getDayScorePart(bestDay?.value)}</StatisticsValue>
            </td>
            <td>Worst Day:
              <StatisticsValue>{worstDay?.date} {getDayScorePart(worstDay?.value)}</StatisticsValue>
            </td>
          </tr>
          <tr>
            {getPlayerRow('Most Played With', mostFrequentTeammate, 'matches', true)}
            {getPlayerRow('Least PLayed With', leastFrequentTeammate, 'matches', false)}
          </tr>
          <tr>
            {getPlayerRow('Most Played Against', mostFrequentOpponent, 'matches', true)}
            {getPlayerRow('Least Played Against', leastFrequentOpponent, 'matches', false)}
          </tr>
          <tr>
            {getPlayerRow('Most Won With', mostSuccessTeammate, 'wins', true)}
            {getPlayerRow('Least Won With', leastSuccessTeammate, 'wins', false)}
          </tr>
          <tr>
            {getPlayerRow('Most Won Over', mostSuccessOpponent, 'wins', true)}
            {getPlayerRow('Most Lost To', leastSuccessOpponent, 'losses', false)}
          </tr>
        </tbody>
      </StatisticsTable>
    </>
  )
}

const getDayScorePart = score => getScorePart(score, score > 0, score > 0 ? '+' : '')

const getScorePart = (value, isGreen, sign = 'x') => (
  <WinnerSpan winner={isGreen}>{sign}{value}</WinnerSpan>
)

const getPlayerRow = (text, stat, valueKey, isGreen) => (
  <td>{text}:
    <StatisticsValue>
      {getPlayerLink(stat.player)} {getScorePart(stat[valueKey], isGreen)}
    </StatisticsValue>
  </td>
)

const getPlayerLink = player => (
  <StyledLink key={player?.id} to={createProfilePath(player?.id)}>{player?.name}
   &nbsp;<span>({player?.matchRating})</span></StyledLink>
)

import React from 'react'
import { BattleHistory } from '../../components/BattleHistory/BattleHistory'
import { Subtitle, Box } from './../../../styles/blocks'
import { connect } from 'react-redux'
import { getLastMatches } from '../../modules/matches/matches-selectors'
import { createMatchWithPlayerLinks } from '../../modules/matches/matches-utils'

const MatchListPageComponent = ({ lastMatches }) =>
  <>
    <Box Margin="10px" Padding="10px">
      <Subtitle textAlign="center">Last Battles</Subtitle>
      <BattleHistory lastMatches={lastMatches} maxItems={Number.MAX_SAFE_INTEGER} />
    </Box>
  </>

const mapStateToProps = (state, { constructUrl }) => ({
  lastMatches: getLastMatches(state).map(match => createMatchWithPlayerLinks(match, constructUrl)),
})

export const MatchListPage = connect(mapStateToProps)(MatchListPageComponent)

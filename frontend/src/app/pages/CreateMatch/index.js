import React from 'react'
import { CreateMatch } from '../../components/CreateMatch/CreateMatch'
import { MAX_PLAYERS_IN_MATCH, MIN_PLAYERS_IN_MATCH } from '../../const/constants'

export const CreateMatchPage = ({ constructUrl }) =>
  <CreateMatch constructUrl={constructUrl}
    maxPlayerNumber={MAX_PLAYERS_IN_MATCH}
    minPlayerNumber={MIN_PLAYERS_IN_MATCH} />

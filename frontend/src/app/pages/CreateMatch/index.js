import React from 'react'
import { CreateMatch } from '../../components/CreateMatch/CreateMatch'

export const CreateMatchPage = ({ constructUrl }) =>
  <CreateMatch constructUrl={constructUrl} maxPlayerNumber={2} minPlayerNumber={1} />

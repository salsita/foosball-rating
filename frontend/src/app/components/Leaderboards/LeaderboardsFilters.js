import React from 'react'
import { FiltersBlock, FiltersSpan } from '../../../styles/blocks'
import * as Filters from '../../const/leaderboards-filters'

export const LeaderboardsFilters = ({ filters, updateCriteria, updateOrder, updateTimespan }) => (
  <FiltersBlock>
    {Object.entries(Filters.criteriaTypes).map(([key, value]) =>
      <FiltersSpan key={key} className={value === filters.criteria ? 'active-filter' : ''}
        onClick={() => updateCriteria(value)}>{key}</FiltersSpan>,
    )}

    {Object.entries(Filters.orderTypes).map(([key, value]) =>
      <FiltersSpan key={key} className={value === filters.order ? 'active-filter' : ''}
        onClick={() => updateOrder(value)}>{value}</FiltersSpan>,
    )}

    {Object.entries(Filters.timespanTypes).map(([key, value]) =>
      <FiltersSpan key={key} className={value === filters.timespan ? 'active-filter' : ''}
        onClick={() => updateTimespan(value)}>{key.split(/(?=[A-Z0-9])/).join(' ')}
      </FiltersSpan>,
    )}
  </FiltersBlock>
)

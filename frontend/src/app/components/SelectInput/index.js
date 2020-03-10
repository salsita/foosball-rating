import React from 'react'
import { SelectBox } from './../../../styles/blocks'

export const SelectInput = ({ items, selectedValue, onChange }) => (
  <SelectBox onChange={onChange} value={selectedValue}>
    {items.map(item =>
      <option key={item.value} value={item.value}>
        {item.label}
      </option>,
    )}
  </SelectBox>
)

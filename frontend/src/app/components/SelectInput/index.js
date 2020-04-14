import React from 'react'
import { SelectBox } from './../../../styles/blocks'

export const SelectInput = ({ id, items, selectedValue, onChange }) => (
  <SelectBox id={id} onChange={onChange} value={selectedValue}>
    {items.map(item =>
      <option key={item.value} value={item.value}>
        {item.label}
      </option>,
    )}
  </SelectBox>
)

import React from 'react';
import { SelectBox } from './../../../styles/blocks';

const SelectInput = ({ items, selectedValue, onChange }) => (
  <SelectBox onChange={onChange}>
    {items.map((item) => 
      <option value={item.value} selected={item.value == selectedValue}>
        {item.label}
      </option>  
    )}
  </SelectBox>
)

export default SelectInput;



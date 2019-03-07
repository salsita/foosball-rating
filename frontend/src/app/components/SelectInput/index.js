import React from 'react';
import { SelectBox } from './../../../styles/blocks';

const SelectInput = ({ data }) => (
  <SelectBox>
    {data.map((data) => 
      <option value={data.name}>
        {data.name}
      </option>  
    )}
  </SelectBox>
)

export default SelectInput;



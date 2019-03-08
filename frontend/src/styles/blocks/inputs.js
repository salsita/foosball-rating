import styled from 'styled-components';
import variables from './../variables';

const SelectBox = styled.select`
  display: block;
  padding: 15px 20px;
  border-radius: 8px;
  width: 100%;
  font-weight: 700;
  line-height: 1.3;
  box-sizing: border-box;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  margin-bottom: 10px;
  :focus {
      outline: none;
  }
  option {
      font-weight:normal;
  }

  @media (min-width: ${variables.bpMedium}) {
    width: 300px;
    margin: 0 auto 10px;
  }
`

const SelectLabel = styled.label`

`

export { SelectBox, SelectLabel };

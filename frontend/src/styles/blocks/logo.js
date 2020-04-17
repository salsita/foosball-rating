import styled from 'styled-components'
import { variables } from './../variables'
import { LogoComponent } from '../../app/components/logo'

export const Logo = styled(LogoComponent)`
  #smalllogo {
    display: none
  }
  @media (max-width: ${variables.bpSmall}) {
    #largelogo {
      display: none;
    }
    #smalllogo {
      display: inherit;
    }
  }
  height: 100%;
  a,img {
    height: 100%;
  }
  a {
    padding: 0px;
  }
`

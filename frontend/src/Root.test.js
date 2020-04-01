import React from 'react'
import ReactDOM from 'react-dom'
import { Root } from './Root'

import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Root />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('matches snapshot', () => {
  expect(shallow(<Root/>)).toMatchSnapshot()
})

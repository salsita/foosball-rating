import { SelectGamePage } from '../pages/SelectGamePage'

describe('Select Game Page', () => {
  const selectGamePage = new SelectGamePage()
  before(() => {
    selectGamePage.visit()
  })
  it('renders', () => {
    selectGamePage.locate()
  })
})

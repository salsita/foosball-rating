import { DashboardPage } from '../pages/DashboardPage'

describe('Dashboard', () => {
  const dashboardPage = new DashboardPage('foosball')
  before(() => {
    dashboardPage.visit()
  })
  it('renders', () => {
    dashboardPage.locate()
  })
})

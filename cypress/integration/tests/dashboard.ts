import { DashboardPage } from '../pages/DashboardPage'

describe('Dashboard', () => {
  const dashboardPage = new DashboardPage('foosball')
  beforeEach(() => {
    dashboardPage.visit()
  })
  it('contains Last Battles and Top Rating titles', () => {
    dashboardPage.getContent()
      .should('contain.text', 'Last Battles')
      .should('contain.text', 'Top Rating')
  })
})

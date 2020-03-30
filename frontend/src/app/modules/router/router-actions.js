import { createActions } from 'reduxsauce'

export const RouterActions = createActions({
  urlChanged: [ 'url' ],
  urlInit: [ 'url' ],
}, {
  prefix: 'foosball-rating/router/',
})

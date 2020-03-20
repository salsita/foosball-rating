import React from 'react'
import { withRouter, Route } from 'react-router-dom'
import { Header } from './header'
import { Footer } from './Footer/footer'
import { Container } from '../../styles/blocks/layout'
import { Game } from './Game'
import { SelectGameByUrl } from './SelectGameByUrl'
import { ShowIfGameIsSelected } from './ShowIfGameSelected'
import { SelectGamePage } from '../pages/SelectGamePage'
import { GameNotFoundPage } from '../pages/GameNotFound'

class RootComponent extends React.Component {
  render() {
    return <>
      <Route path='/:gameName' component={SelectGameByUrl}/>
      <Header/>
      <Container>
        <ShowIfGameIsSelected>
          <Route path='/:gameName' component={Game} />
          <Route path='/:gameName' component={GameNotFoundPage}/>
        </ShowIfGameIsSelected>
        <Route exact path='/' component={SelectGamePage}/>
      </Container>
      <Footer/>
    </>
  }
}

export const Root = withRouter(RootComponent)

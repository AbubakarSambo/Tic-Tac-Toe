import React, { Component } from 'react'
import sprite from './sprite.svg'
import player from './player.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="square">
      {this.props.sprite ? <img src={sprite} alt='' /> : null}
      {this.props.player ? <img src={player} alt='' /> : null}
      </div>
    )
  }
}

export default App

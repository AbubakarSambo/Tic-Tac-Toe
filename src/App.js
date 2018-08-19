import React, { Component } from 'react';
import KeyHandler from 'react-key-handler'
import './App.css';
import Board from './Board'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: 0,
      columns: 0,
      sprites: [],
      playerX: 0,
      playerY: 0,
      spritesLeft: 0,
      totalMoves: 0
    }
  }
  componentDidMount = () => {
    const width = prompt("please enter the size of the square")
    this.setState({
      rows: width, columns: width, 
      playerX: Math.floor((width)/2), 
      playerY: Math.floor((width)/2),
      sprites: this.generateSprites(width),
      spritesLeft: parseInt(width)
    })
    
  }
  shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a
  }
  generateSprites = (width) => {
    let rows = []
    let cols = []
    for (let i = 0; i < width; i++) {
      rows.push(i)
    }
    for (let j = 0; j < width; j++) {
      cols.push(j)
    }
    this.shuffle(rows)
    this.shuffle(cols)
    return [rows, cols]
  }

  goRight = () => {
    if(this.state.playerY <= this.state.rows - 2){
      this.setState({playerY: this.state.playerY + 1, totalMoves: this.state.totalMoves + 1})
    }
    
  }
  goLeft = () => {
    if(this.state.playerY >= 1){
      this.setState({playerY: this.state.playerY - 1, totalMoves: this.state.totalMoves + 1})
    }
  }
  goUp = () => {
    if(this.state.playerX >= 1){
      this.setState({playerX: this.state.playerX - 1, totalMoves: this.state.totalMoves + 1})
    }
  }
  goDown = () => {
    if(this.state.playerX <= this.state.rows - 2){
      this.setState({playerX: this.state.playerX + 1, totalMoves: this.state.totalMoves + 1})
    }
  }
  checkSpritesLeft = () => {
    if(this.state.sprites[1][this.state.sprites[0].indexOf(this.state.playerX)] === this.state.playerY){
      this.setState({spritesLeft: this.state.spritesLeft - 1})
      this.state.sprites[1][this.state.sprites[0].indexOf(this.state.playerX)] = -1
    }
  }
  handleKeyDown = (e) => {
    switch (e.code) {
      case 'ArrowRight':
        this.goRight()
        this.checkSpritesLeft()
        break
      case 'ArrowLeft':
        this.goLeft()
        this.checkSpritesLeft()
        break
      case 'ArrowUp':
        this.goUp()
        this.checkSpritesLeft()
        break
      case 'ArrowDown':
        this.goDown()
        this.checkSpritesLeft()
        break
      default:
        break
    }
  }
  render() {

    return (
      <div className="game">
        <KeyHandler keyEventName="keydown" keyValue="ArrowRight" onKeyHandle={this.handleKeyDown} />
        <KeyHandler keyEventName="keydown" keyValue="ArrowLeft" onKeyHandle={this.handleKeyDown} />
        <KeyHandler keyEventName="keydown" keyValue="ArrowUp" onKeyHandle={this.handleKeyDown} />
        <KeyHandler keyEventName="keydown" keyValue="ArrowDown" onKeyHandle={this.handleKeyDown} />
        <div className="game-board">
          <Board rows={this.state.rows}
            columns={this.state.columns}
            sprites={this.state.sprites}
            playerX={this.state.playerX}
            playerY={this.state.playerY}
            spritesLeft={this.state.spritesLeft}
            totalMoves={this.state.totalMoves}
            />
        </div>
      </div>
    );
  }
}

export default App;

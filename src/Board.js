import React from 'react'
import Square from './square'

class Board extends React.Component {
    renderSquare = (i) => {
        let columns = []
        for (let j = 0; j < this.props.columns; j++) {
            let hasSprite = false
            let hasPlayer = false
            if (i === this.props.playerX && j === this.props.playerY) {
                hasPlayer = true
            }
            if (this.props.sprites[1][this.props.sprites[0].indexOf(i)] === j) {
                hasSprite = true
            }
            if ((hasSprite) && (hasPlayer)) {
                hasSprite = false
                if (this.props.spritesLeft < 1) {
                    alert(`you finished in ${this.props.totalMoves} steps`)
                }
            }
            columns.push(<Square key={j} sprite={hasSprite} player={hasPlayer} />)
        }
        return columns
    }
    renderRow = () => {
        let rows = []
        for (let i = 0; i < this.props.rows; i++) {
            rows.push(<div key={i} className="board-row">
                {this.renderSquare(i)}
            </div>)
        }
        return rows
    }
    render() {
        return (
            <div>
                {this.renderRow()}
            </div>
        )
    }
}

export default Board
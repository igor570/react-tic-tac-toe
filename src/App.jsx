import { useState } from 'react'
import '/src/App.css'

function Square({ value, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  const [xTurn, setXTurn] = useState(false)
  const [squares, setSquares] = useState(Array(9).fill(null))

  function handleClick(i) {
    // Ends early if Square is already populated
    if (squares[i] || calculateWinner(squares)) {
      return
    }

    // Making a copy of squares state array called newSquares
    const newSquares = squares.slice()
    if (xTurn === false) {
      newSquares[i] = 'X'
      setXTurn(true)
    } else {
      newSquares[i] = 'O'
      setXTurn(false)
    }
    setSquares(newSquares)
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = `Winner: ${winner} 🥳`
  } else {
    status = 'Next player: ' + (xTurn ? 'O' : 'X') + ' 👇'
  }

  return (
    <>
      <div className='gameWrapper'>
        <div className='status'>{status}</div>
        <div className='board-row'>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className='board-row'>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className='board-row'>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  )
}

export default App

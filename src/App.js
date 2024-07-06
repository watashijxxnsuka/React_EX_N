import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
          <button className="square" onClick={onSquareClick}>
            {value}
          </button>
  );
}


function Board(xIsNext, squares, onPlay) {
  function handleClick(i) {
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <> 
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      </div>
      <div className="board-row">
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      </div>
      <div className="board-row">
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        <Square value={squares[9]} onSquareClick={() => handleClick(9)}/>
        <Square value={squares[10]} onSquareClick={() => handleClick(10)}/>
        <Square value={squares[11]} onSquareClick={() => handleClick(11)}/>
      </div>
      <div className="board-row">
        <Square value={squares[12]} onSquareClick={() => handleClick(12)}/>
        <Square value={squares[13]} onSquareClick={() => handleClick(13)}/>
        <Square value={squares[14]} onSquareClick={() => handleClick(14)}/>
        <Square value={squares[15]} onSquareClick={() => handleClick(15)}/>
      </div>
    </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(15).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(xIsNext);
  }

  return(
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12]
  ];
  for(let i = 0 ; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[c] === squares[d]) {
      return squares[a];
    }
  }
  return null; 
}
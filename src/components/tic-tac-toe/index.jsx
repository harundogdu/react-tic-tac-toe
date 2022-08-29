import { useEffect, useState } from 'react';
import './index.css';

export default function TicTacToe() {
  const [turnPlay, setTurnPlay] = useState('x');
  const [cells, setCells] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const checkForWinner = squares => {
    let combos = {
      accross: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
      ],
      diagnol: [
        [0, 4, 8],
        [2, 4, 6]
      ]
    };

    for (let combo in combos) {
      combos[combo].forEach(pattern => {
        if (
          squares[pattern[0]] === '' &&
          squares[pattern[1]] === '' &&
          squares[pattern[2]] === ''
        )
          return false;
        else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
          return true;
        }
      });
    }

    return false;
  };

  const handleClick = num => {
    if (winner) {
      return;
    }

    if (cells[num] !== '') {
      alert('already played');
      return;
    }

    setCells(cells.map((cell, index) => (index === num ? turnPlay : cell)));
    setTurnPlay(turnPlay === 'x' ? 'o' : 'x');
  };

  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(''));
    setTurnPlay('x');
    setIsDraw(false);
  };

  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };

  useEffect(() => {
    checkForWinner(cells);
  }, [cells]);

  useEffect(() => {
    if (winner) {
      setIsDraw(false);
    } else if (cells.every(cell => cell !== '')) {
      setIsDraw(true);
    }
  }, [cells, winner]);

  return (
    <div className='container'>
      <table>
        <caption>Turn : {turnPlay}</caption>
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      {isDraw ? (
        <>
          <h1>Draw!</h1> <button onClick={handleRestart}>Restart Game</button>
        </>
      ) : winner ? (
        <>
          <h1>{winner} is the winner</h1>{' '}
          <button onClick={handleRestart}>Restart Game</button>
        </>
      ) : null}
    </div>
  );
}

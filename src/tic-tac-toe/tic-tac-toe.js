import React, { useState } from "react";
import Square from "./square";
import "./tictactoe.css";

const squares = [
  {
    isMarked: false,
    isCross: false,
  },
  {
    isMarked: false,
    isCross: false,
  },
  {
    isMarked: false,
    isCross: false,
  },
  {
    isMarked: false,
    isCross: false,
  },
  {
    isMarked: false,
    isCross: false,
  },
  {
    isMarked: false,
    isCross: false,
  },
  {
    isMarked: false,
    isCross: false,
  },
  {
    isMarked: false,
    isCross: false,
  },
  {
    isMarked: false,
    isCross: false,
  },
];

const winCases = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
const crossNumbers = [];
const circleNumbers = [];

const TicTacToe = () => {
  const [isCrossSign, setIsCrossSign] = useState(true);
  const [isWin, setIsWin] = useState(false);
  const [filledWin, setFilledWin] = useState([]);

  const checkWinCase = (winCase, Arr) => {
    if (winCase.every((winNumber) => Arr.includes(winNumber))) {
      setIsWin(true);
      setFilledWin(() => winCase);
    }
  };

  const winChecker = (square, idx) => {
    square.isMarked = true;
    square.isCross = isCrossSign;

    if (isCrossSign) crossNumbers.push(idx + 1);
    else circleNumbers.push(idx + 1);

    winCases.forEach((winCase) => {
      checkWinCase(winCase, crossNumbers);
      checkWinCase(winCase, circleNumbers);
    });

    setIsCrossSign((currentState) => !currentState);
  };

  return (
    <div>
      <div>{isCrossSign ? "X turn" : "O turn"}</div>
      <div className="board">
        {squares.map((square, idx) => {
          return (
            <button
              key={idx}
              className={`${filledWin.includes(idx + 1) ? "win" : ""} square`}
              onClick={() => {
                !square.isMarked && !isWin && winChecker(square, idx);
              }}
            >
              <Square
                key={idx}
                isMarked={square.isMarked}
                isCross={square.isCross}
              />
            </button>
          );
        })}
      </div>
      {isWin ? (
        <span>{isCrossSign ? "O" : "X"} Win</span>
      ) : (
        <span>{crossNumbers.length === 5 && "Draw"}</span>
      )}
    </div>
  );
};

export default TicTacToe;

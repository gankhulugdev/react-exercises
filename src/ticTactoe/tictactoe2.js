import React, { useState } from "react";
import "./tictactoe.css";

const TicTacToeV2 = () => {
  const [currentSymbol, setCurrentSymbol] = useState(currentSign);
  const [tileData, setTileData] = useState({});
  const [isWin, setIsWin] = useState(false);
  const [winTiles, setWinTiles] = useState([]);

  const checkWinner = (tileIdx) => {
    tileLoc[tileIdx] = currentSymbol;

    const crossLoc = Object.keys(tileLoc).filter(
      (key) => tileLoc[key] === symbolX
    );
    const circleLoc = Object.keys(tileLoc).filter(
      (key) => tileLoc[key] === symbolO
    );

    possibilities.forEach((p) => {
      if (p.every((element) => circleLoc.includes(element.toString()))) {
        setIsWin(true);
        setWinTiles(p);
      }
      if (p.every((element) => crossLoc.includes(element.toString()))) {
        setIsWin(true);
        setWinTiles(p);
      }
    });
    setTileData(() => tileLoc);
    setCurrentSymbol((currentState) =>
      currentState === symbolX ? symbolO : symbolX
    );
  };

  return (
    <div className="board-container">
      <span>{`${currentSymbol} turn`}</span>
      <div className="board">
        {[...Array(9)].map((tile, tileIdx) => {
          return (
            <button
              className={`${winTiles.includes(tileIdx) ? "win" : ""} square`}
              key={tileIdx}
              onClick={() => {
                !tileData[tileIdx] && !isWin && checkWinner(tileIdx);
              }}
            >
              {tileData[tileIdx]}
            </button>
          );
        })}
      </div>
      <button
        className="restart"
        onClick={() => {
          for (const key in tileLoc) {
            delete tileLoc[key];
          }
          setIsWin(false);
          setTileData({});
          setCurrentSymbol(symbolX);
          setWinTiles([]);
        }}
      >
        Restart
      </button>

      {isWin ? (
        <span>{`${currentSymbol === symbolX ? symbolO : symbolX} WIN`}</span>
      ) : (
        <span>{`${Object.keys(tileLoc).length === 9 ? "DRAW" : ""}`}</span>
      )}
      <br />
    </div>
  );
};

const symbolX = "X";
const symbolO = "O";
let currentSign = symbolX;

const tileLoc = {};

const possibilities = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default TicTacToeV2;

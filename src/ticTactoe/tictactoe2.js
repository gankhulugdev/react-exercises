import React, { useState } from "react";
import "./tictactoe.css";

const TicTacToeV2 = () => {
  const [currentSymbol, setCurrentSymbol] = useState(currentSign);
  const [tileData, setTileData] = useState({});
  const [isWin, setIsWin] = useState(false);
  const [winTiles, setWinTiles] = useState([]);

  const checkWinner = (tileIdx) => {
    const tileDataTemp = { ...tileData, [tileIdx]: currentSymbol };

    const currSymbolLoc = Object.keys(tileDataTemp).filter(
      (key) => tileDataTemp[key] === currentSymbol
    );

    possibilities.forEach((p) => {
      if (p.every((element) => currSymbolLoc.includes(element.toString()))) {
        setIsWin(true);
        setWinTiles(p);
      }
    });
    setTileData(tileDataTemp);
    setCurrentSymbol((currentState) =>
      currentState === symbolX ? symbolO : symbolX
    );
  }

  return (
    <div className="board-container">
      <span className="text">{`${currentSymbol} turn`}</span>
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
          setIsWin(false);
          setTileData({});
          setCurrentSymbol(symbolX);
          setWinTiles([]);
        }}
      >
        Restart
      </button>

      {isWin ? (
        <span className="text">{`${
          currentSymbol === symbolX ? symbolO : symbolX
        } WIN`}</span>
      ) : (
        <span className="text">{`${
          Object.keys(tileData).length === 9 ? "DRAW" : ""
        }`}</span>
      )}
      <br />
    </div>
  );
};

const symbolX = "X";
const symbolO = "O";
let currentSign = symbolX;

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

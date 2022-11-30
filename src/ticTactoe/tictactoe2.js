import React, { useState, useEffect } from "react";
import "./tictactoe.css";

const TicTacToeV2 = () => {
  const [tileData, setTileData] = useState({ currentSymbol: symbolX });
  const [isWin, setIsWin] = useState(false);
  const [winTiles, setWinTiles] = useState([]);

  useEffect(() => {
    if (Object.keys(tileData).length >= 6) {
      possibilities.forEach((possibility) => {
        if (
          possibility.every(
            (pNum) =>
              tileData[pNum] ===
              (tileData.currentSymbol === symbolX ? symbolO : symbolX)
          )
        ) {
          setIsWin(true);
          setWinTiles(possibility);
        }
      });
    }
  }, [tileData]);

  return (
    <div className="board-container">
      <div className="board">
        {[...Array(9)].map((tile, tileIdx) => {
          return (
            <button
              className={`${winTiles.includes(tileIdx) ? "win" : ""} square`}
              key={tileIdx}
              onClick={() => {
                !tileData[tileIdx] &&
                  !isWin &&
                  setTileData((currState) => {
                    return {
                      ...currState,
                      [tileIdx]: tileData.currentSymbol,
                      currentSymbol:
                        tileData.currentSymbol === symbolX ? symbolO : symbolX,
                    };
                  });
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
          setTileData({ currentSymbol: symbolX });
          setWinTiles([]);
        }}
      >
        Restart
      </button>

      {isWin ? (
        <span className="text">{`${
          tileData.currentSymbol === symbolX ? symbolO : symbolX
        } WIN`}</span>
      ) : (
        <span className="text">{`${
          Object.keys(tileData).length === 10
            ? "DRAW"
            : `${tileData.currentSymbol} turn`
        }`}</span>
      )}

      <br />
    </div>
  );
};

const symbolX = "X";
const symbolO = "O";

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

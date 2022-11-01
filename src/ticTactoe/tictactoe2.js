import React, { useState } from "react";
import "./tictactoe.css";


const TicTacToeV2 = () => {
  const [currentSymbol, setCurrentSymbol] = useState(currentSign);
  const [tileData, setTileData] = useState({});
  const [isWin, setIsWin] = useState(false);
  // const [tileLoc, setTileLoc] = useState(possibilities)
  const checkWinner = (tileIdx) => {
    setTileData(currentData => ({...currentData, [tileIdx]: currentSymbol}))
    
    const circleLoc = Object.keys(tileData).filter((id) => tileData[id] === symbolO)
    const crossLoc = Object.keys(tileData).filter((id) => tileData[id] === symbolX)
    console.log(circleLoc)
    possibilities.forEach((p)=>{
      
      if(p.every(element => circleLoc.includes(element.toString()))){
        setIsWin(true)
      } 
      if(p.every(element => crossLoc.includes(element.toString()))){
        setIsWin(true)
      }
     
    })

    setCurrentSymbol(currentState => currentState === symbolX ? symbolO : symbolX)

  }
  

  return (
    <div>
      <div className="board">
        {[...Array(9)].map((tile, tileIdx) => {
          return (
            <button
              className="square"
              key={tileIdx}
              onClick={()=> {
                (!tileData[tileIdx] && !isWin) && checkWinner(tileIdx)
              } }
              
            >
              {tileData[tileIdx]}
            </button>
          );
        })}
      </div>
        <span>{JSON.stringify(tileData, null, 2)}</span>
        <br/>
        <span>{isWin ? `${currentSymbol} wins`: ""}</span>
    </div>
  );
};

const symbolX = "X";
const symbolO = "O";
let currentSign = symbolX;

const possibilities = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]    
] 

export default TicTacToeV2;
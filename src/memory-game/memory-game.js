import "./memory-game.css";
import React, { useState, useEffect, useRef } from "react";

import icon0 from "./assets/card.png";
import icon1 from "./assets/clock.png";
import icon2 from "./assets/diamond.png";
import icon3 from "./assets/dynamit.png";
import icon4 from "./assets/gift.png";
import icon5 from "./assets/hammer.png";
import icon6 from "./assets/heart.png";
import icon7 from "./assets/key.png";
import icon8 from "./assets/magnet.png";
import startButton from "./assets/start_button.png";

const MemoryGame = () => {
  const randomize = (arr) => arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  // const [randomizedCards, setRandomizedCards] = useState([...cards, ...cards]); for testing purpose
  const [randomizedCards, setRandomizedCards] = useState(
    randomize([...cards, ...cards])
  );
  const [flippedCard, setFlippedCard] = useState({});
  const [matchedCards, setMatchedCards] = useState({});
  const [score, setScore] = useState({ playerOne: 0, playerTwo: 0 });
  const [isWin, setIsWin] = useState(false);

  const currentPlayer = useRef("playerOne");

  useEffect(() => {
    if (Object.keys(flippedCard).length === 2) {
      const [first, second] = Object.keys(flippedCard);
      // check matching
      if (flippedCard[first].name === flippedCard[second].name) {
        setMatchedCards((currentState) => ({
          ...currentState,
          [first]: flippedCard[first],
          [second]: flippedCard[second],
        }));
        setScore((currentState) => ({
          ...currentState,
          [currentPlayer.current]: currentState[currentPlayer.current] + 1,
        }));

        setFlippedCard({});
      } else {
        currentPlayer.current =
          currentPlayer.current === "playerOne" ? "playerTwo" : "playerOne";
        setTimeout(() => setFlippedCard({}), 1000);
      }
    }
  }, [flippedCard]);

  useEffect(() => {
    if (Object.keys(matchedCards).length === 16) {
      // win
      setIsWin(true);
    }
  }, [matchedCards]);

  return (
    <div className="game">
      <div className="player">
        {" "}
        {isWin
          ? `${
              score.playerOne > score.playerTwo
                ? "Player One wins"
                : score.playerOne < score.playerTwo
                ? "Player two wins"
                : "Draw"
            }`
          : `Turn ${
              currentPlayer.current === "playerOne" ? "Player I" : "Player II"
            }`}
      </div>
      <div className="cards-container">
        <div className="score">Player I : {score.playerOne}</div>
        <div className="cards">
          {randomizedCards.map((card, idx) => {
            return (
              <button
                className="card"
                key={idx}
                onClick={() => {
                  Object.keys(flippedCard).length <= 1 &&
                    !matchedCards[idx] &&
                    setFlippedCard((currState) => ({
                      ...currState,
                      [idx]: { ...card, player: currentPlayer.current },
                    }));
                }}
              >
                {flippedCard[idx] || matchedCards[idx] ? (
                  <img
                    alt=""
                    src={`${
                      matchedCards[idx]
                        ? matchedCards[idx].src
                        : flippedCard[idx].src
                    }`}
                  />
                ) : (
                  <img alt={icon0} src={icon0} />
                )}
              </button>
            );
          })}
        </div>

        <div className="score">Player II : {score.playerTwo}</div>
      </div>

      <button
        className="start-btn"
        onClick={() => {
          currentPlayer.current("playerOne");
          setScore({ playerOne: 0, playerTwo: 0 });
          setIsWin(false);
          setMatchedCards({});
          setFlippedCard({});

          setRandomizedCards((currentState) => {
            return [...randomize(currentState)];
          });
        }}
      >
        <img alt={startButton} className="start-btn" src={startButton} />
      </button>
    </div>
  );
};

const cards = [
  { name: "clock", src: icon1 },
  { name: "diamond", src: icon2 },
  { name: "dynamit", src: icon3 },
  { name: "gift", src: icon4 },
  { name: "hammer", src: icon5 },
  { name: "heart", src: icon6 },
  { name: "key", src: icon7 },
  { name: "magnet", src: icon8 },
];

export default MemoryGame;

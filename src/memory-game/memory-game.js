import "./memory-game.css";
import React, { useState } from "react";

import icon0 from "./assets/card.png";
import icon1 from "./assets/clock.png";
import icon2 from "./assets/diamond.png";
import icon3 from "./assets/dynamit.png";
import icon4 from "./assets/gift.png";
import icon5 from "./assets/hammer.png";
import icon6 from "./assets/heart.png";
import icon7 from "./assets/key.png";
import icon8 from "./assets/magnet.png";
import startButton from "./assets/start_button.png"

const MemoryGame = () => {
  const randomize = (arr) => arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  // const [randomizedCards, setRandomizedCards] = useState([...cards, ...cards]); for testing purpose
  const [randomizedCards, setRandomizedCards] = useState([...randomize(cards), ...randomize(cards)]);
  const [flippedCard, setFlippedCard] = useState({});
  const [matchedCards, setMatchedCards] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState("playerOne");
  const [score, setScore] = useState({ playerOne: 0, playerTwo: 0 });
  const [isWin, setIsWin] = useState(false);

  const flipCard = (card, id) => {
    const tempFlippedCard = {
      ...flippedCard,
      [id]: { ...card, player: currentPlayer },
    };

    if (Object.keys(tempFlippedCard).length === 2) {
      const [first, second] = Object.keys(tempFlippedCard);
      // check matching
      if (tempFlippedCard[first].name === tempFlippedCard[second].name) {
        const tempMatchedCards = {
          ...matchedCards,
          [first]: tempFlippedCard[first],
          [second]: tempFlippedCard[second],
        };

        setMatchedCards(tempMatchedCards);
        setScore((currentState) => ({
          ...currentState,
          [currentPlayer]: currentState[currentPlayer] + 1,
        }));

        if (Object.keys(tempMatchedCards).length === 16) {
          // win
          setIsWin(true);
        }
        setFlippedCard({});
      } else {
        setFlippedCard(tempFlippedCard);
        setCurrentPlayer((currentState) =>
          currentState === "playerOne" ? "playerTwo" : "playerOne"
        );
        setTimeout(() => setFlippedCard({}), 2000);
      }
    } else {
      setFlippedCard(tempFlippedCard);
    }
  };

  return (
    <div className="game">
      <div className="player">  {isWin
          ? `${
              score.playerOne > score.playerTwo
                ? "Player One wins"
                : score.playerOne < score.playerTwo
                ? "Player two wins"
                : "Draw"
            }`
          : `Turn ${currentPlayer === 'playerOne' ? 'Player I' :'Player II'}`}</div>
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
                    flipCard(card, idx);
                }}
              >
                {/* <Card /> */}
                {flippedCard[idx] || matchedCards[idx] ? (
                  <img
                    src={`${
                      matchedCards[idx]
                        ? matchedCards[idx].src
                        : flippedCard[idx].src
                    }`}
                  />
                ) : (
                  <img src={icon0} />
                )}
              </button>
            );
          })}
        </div>

        <div className="score">Player II : {score.playerTwo}</div>
      </div>

      <button className="start-btn"
        onClick={() => {
          setScore({ playerOne: 0, playerTwo: 0 });
          setIsWin(false);
          setCurrentPlayer("playerOne");
          setMatchedCards({});
          setFlippedCard({});

          // setRandomizedCards([...randomize(cards), ...randomize(cards)])
          setRandomizedCards((currentState) => {
            return [...randomize(currentState)];
          });
        }}
      >
        <img className="start-btn" src={startButton}/>
      </button>
      <div className="win">
      
      </div>
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

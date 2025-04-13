import React from "react";
import "./HeartGame.css";

const GameEndScreen = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="game-end-screen-wrapper">
      <div className="end-message">
        <h2>You caught them all.</h2>
        <p>Just like you have mine ❤️</p>
        <button onClick={onNext}>Next ➡️</button>
      </div>
    </div>
  );
};

export default GameEndScreen;

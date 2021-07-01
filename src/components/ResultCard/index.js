import React from "react";
import "./style.css";

const ResultCard = (props) => {
  return (
    <div className="result-card__container">
      <div className="result-card__banner">
        <div className="result-card__wpm">
          <h1>{props.wpm} WPM</h1>
          <p>(words per minute)</p>
        </div>
        <div className="result-card__statistics">
          <h2>Correct Words: {props.correct}</h2>
          <h2>Incorrect Words: {props.incorrect}</h2>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;

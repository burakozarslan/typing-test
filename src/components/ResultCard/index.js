import React from "react";
import "./style.css";

const ResultCard = (props) => {
  return (
    <div className="result-card__container">
      <div className="result-card__banner">
        <h3>Result</h3>
      </div>
      <div className="result-card__wpm">
        <h1>{props.wpm} WPM</h1>
        <p>(words per minute)</p>
      </div>
      <div className="result-card__statistics">
        {/* <h4>Key Strokes: NaN</h4>
        <h4>Accuracy: NaN%</h4> */}
        <h4>Correct Words: {props.correct}</h4>
        <h4>Wrong Words: {props.incorrect}</h4>
      </div>
    </div>
  );
};

export default ResultCard;

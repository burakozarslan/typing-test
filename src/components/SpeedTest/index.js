import React, { useState, useEffect } from "react";

import "./style.css";
import { fetchAllWords } from "../../services/network/fetchWords";
import { organizeRows } from "../../services/utils/organizeRows";

const SpeedTest = () => {
  // all words fetched through api
  const [words, setWords] = useState([]);
  // index of current word
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // rows of words - each row consists 8 words
  const [rows, setRows] = useState([]);
  // index of current row
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  // value entered in input field
  const [inputValue, setInputValue] = useState("");
  // holds state of current word's accuracy
  const [isTypo, setIsTypo] = useState(false);
  // number of correct words
  const [numOfCorrectWords, setNumOfCorrectWords] = useState(0);
  // number of incorrect words
  const [numOfIncorrectWords, setNumOfIncorrectWords] = useState(0);

  useEffect(() => {
    fetchAllWords(40)
      .then(({ data }) => setWords(data))
      .catch((err) => console.log(err.message));
  }, []);

  // updates isTypo state when inputValue changes
  useEffect(() => {
    if (words.length !== 0) {
      // if current word and inputValue are equal
      if (words[currentWordIndex] === inputValue) setIsTypo(false);
      else setIsTypo(true);
    }
  }, [inputValue, currentWordIndex, words]);

  // executed after words are fetched
  useEffect(() => {
    if (words.length !== 0) {
      // splits words into rows consist of 8 words, then updates rows state
      setRows(organizeRows(words));
    }
  }, [words]);

  // keeps track of current row
  useEffect(() => {
    setCurrentRowIndex(Math.floor(currentWordIndex / 8));
  }, [currentWordIndex]);

  const handleToNextWord = () => {
    setCurrentWordIndex(currentWordIndex + 1);
    setInputValue("");

    // increment correct words number by 1
    if (isTypo) setNumOfCorrectWords(numOfCorrectWords + 1);
    // increment incorrect words number by 1
    else setNumOfIncorrectWords(numOfIncorrectWords + 1);

    // reset isTypo state
    setIsTypo(false);
  };

  const handleKeyPress = (event) => {
    // if Spacebar pressed
    if (event.nativeEvent.data === " ") handleToNextWord();
    else setInputValue(event.target.value);
  };

  return (
    <div className="speed-test--container">
      <div className="words--container">
        {rows.length !== 0 &&
          rows[currentRowIndex].map((word, index) => {
            return (
              <span
                key={index}
                className={`word ${
                  currentWordIndex % 8 === index ? "active" : null
                } ${
                  words[currentWordIndex].startsWith(inputValue) ? null : "typo"
                }`}
              >
                {word}
              </span>
            );
          })}
      </div>
      <input
        type="text"
        onChange={(event) => handleKeyPress(event)}
        value={inputValue}
        placeholder="Start Typing"
      />
      {JSON.stringify(rows)}
    </div>
  );
};

export default SpeedTest;

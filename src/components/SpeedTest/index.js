import React, { useState, useEffect, useCallback } from "react";
import "./style.css";

import { fetchAllWords } from "../../services/network/fetchWords";
import { organizeRows } from "../../services/utils/organizeRows";

import ResultCard from "../ResultCard";

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
  // correctly spelled words
  const [correctWords, setCorrectWords] = useState([]);
  // incorrectly spelled words
  const [incorrectWords, setIncorrectWords] = useState([]);
  // countdown value in seconds
  const [secondsLeft, setSecondsLeft] = useState(10);
  // is user started typing
  const [isPlaying, setIsPlaying] = useState(false);
  // sets true when time's up
  const [showResults, setShowResults] = useState(false);

  // words per minute
  const [wpm, setWpm] = useState(null);

  const calculateWpm = useCallback(() => {
    let totalChars = 0;

    correctWords.forEach((word) => {
      totalChars = totalChars + word.length;
    });

    let res = Math.ceil(totalChars / 5 / 0.1);
    setWpm(res);
  }, [correctWords]);

  useEffect(() => {
    fetchAllWords(40)
      .then(({ data }) => setWords(data))
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const startDate = new Date();
      var interval = setInterval(() => {
        const now = new Date();
        // time difference in seconds
        let difference = Math.floor((+now - +startDate) / 1000);
        let secsLeft = 10 - difference;

        setSecondsLeft(secsLeft);

        if (secsLeft === 0) clearInterval(interval);
      }, 1000);
    }

    // stop interval when component unmounted
    return () => clearInterval(interval);
  }, [isPlaying]);

  // updates isTypo state when inputValue changes
  useEffect(() => {
    if (words.length !== 0) {
      // if current word and inputValue are equal
      if (words[currentWordIndex] === inputValue) setIsTypo(false);
      else setIsTypo(true);
    }
  }, [inputValue, currentWordIndex, words]);

  // set isPlaying false when no time left
  useEffect(() => {
    if (secondsLeft === 0) {
      setIsPlaying(false);
      // reset words after time is up
      setRows([]);
      // calculate wpm
      calculateWpm();
      // show results
      setShowResults(true);
    }
  }, [secondsLeft, calculateWpm]);

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
    // don't update statistics if timer is not counting
    if (isPlaying) {
      let currentWord = words[currentWordIndex];
      if (!isTypo) {
        // add the current word to 'correct words' list state
        setCorrectWords([...correctWords, currentWord]);
      }
      // add the current word to 'incorrect words' list state
      else setIncorrectWords([...incorrectWords, currentWord]);
    }

    // skip to next word
    setCurrentWordIndex(currentWordIndex + 1);
    // reset input
    setInputValue("");
    // reset isTypo state
    setIsTypo(false);
  };

  const handleKeyPress = (event) => {
    // if Spacebar pressed
    if (event.nativeEvent.data === " ") handleToNextWord();
    else setInputValue(event.target.value);

    // set isPlaying state true, so the timer starts
    // if rows are empty which means game just ended. don't restart the game unless 'replay' button is pressed.
    if (!isPlaying && rows.length !== 0) {
      setIsPlaying(true);
      setShowResults(false);
    }
  };

  return (
    <div className="speed-test--container">
      {secondsLeft}
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
      {showResults && (
        <ResultCard
          wpm={wpm}
          correct={correctWords.length}
          incorrect={incorrectWords.length}
        />
      )}
    </div>
  );
};

export default SpeedTest;

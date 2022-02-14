import { useState, useEffect } from 'react';
import Keyboard from './Keyboard';
import WordRow from './WordRow';
import LoseState from './LoseState';
import WinState from './WinState';
import { getWordFromDictionary, isInDictionary } from './utils/dictionary';

import './WordTable.css'

function createInitialGuesses(word, guessesCount) {
  let initialGuesses = [];
  for (let i = 0; i < guessesCount; i++) {
    initialGuesses[i] = Array.from(word).map(letter => '')
  }
  return initialGuesses;
}

function moveToInput(rowIndex, letterIndex) {
  const inputName = `input[name=input-${rowIndex}-${letterIndex}]`;
  const input = document.querySelector(inputName);
  if (input != null) {
    input.focus();
  }
}

const isProbablyMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const SUBMIT_STATUS = {
  SUCCESS: "SUCCESS",
  INCORRECT: "INCORRECT",
  NOT_IN_DICTIONARY: "NOT_IN_DICTIONARY",
  NOT_CORRECT_LENGTH: "NOT_CORRECT_LENGTH",
}

const GAME_STATUS = {
  PLAYING: "PLAYING",
  WIN: "WIN",
  LOSE: "LOSE",
}

const firstWord = getWordFromDictionary();

function WordTable({
}) {
  const guessesCount = 6;
  const [word, setWord] = useState(firstWord);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.PLAYING);
  const [guesses, setGuesses] = useState(createInitialGuesses(word, guessesCount));
  const [currentEditableRow, setCurrentEditableRow] = useState(0);
  const rowArray = Array.from('x'.repeat(guessesCount));
  const wordArray = Array.from(word);

  const setGuessesFunc = (rowIndex, letterIndex, letter) => {
    setGuesses(prevGuesses => {
      const newRow = [
        ...prevGuesses[rowIndex].slice(0, letterIndex),
        letter,
        ...prevGuesses[rowIndex].slice(letterIndex + 1)
      ];
      return [
        ...prevGuesses.slice(0, rowIndex),
        newRow,
        ...prevGuesses.slice(rowIndex + 1)
      ]
    })
  }

  const getOnChangeLetterHandler = (rowIndex) => (letterIndex) => (e) => {
    const letter = e.target.value;
    const isValidLetter = /[a-zA-Z]/.test(letter)
    if (!isValidLetter) {
      return;
    }
    const letterUpperCase = letter.toUpperCase();
    if (letterIndex < word.length - 1 && letterUpperCase.length > 0) {
      moveToInput(rowIndex, letterIndex + 1);
    } else if (letterIndex > 0 && letterUpperCase.length == 0) {
      moveToInput(rowIndex, letterIndex - 1);
    }
    setGuessesFunc(rowIndex, letterIndex, letterUpperCase);
  }

  const getOnKeyDownHandler = (rowIndex) => (letterIndex) => (e) => {
    const key = e.key.toLowerCase();
    const letter = guesses[rowIndex][letterIndex];
    switch (key) {
      case "backspace":
        if (letter) {
          setGuessesFunc(rowIndex, letterIndex, '');
          moveToInput(rowIndex, letterIndex - 1);
        } else if (letterIndex > 0) {
          moveToInput(rowIndex, letterIndex - 1);
        }
        break;
      case "enter":
        trySubmit(rowIndex, e);
        break;
      default:
        break;
    }
  }

  const isSubmitDisabled = (rowIndex) => {
    if (rowIndex >= guesses.length) {
      return true;
    }
    const guess = guesses[rowIndex].join('');
    return guess.length != word.length || !isInDictionary(guess);
  }

  const onClickSubmit = (rowIndex) => (e) => {
    trySubmit(rowIndex);
  }

  const trySubmit = (rowIndex, e) => {
    const guess = guesses[rowIndex].join('');
    if (guess == word) {
      handleEndState(GAME_STATUS.WIN);
      return SUBMIT_STATUS.CORRECT;
    }
    if (guess.length != word.length) {
      return SUBMIT_STATUS.NOT_CORRECT_LENGTH;
    }
    if (!isInDictionary(guess)) {
      return SUBMIT_STATUS.NOT_IN_DICTIONARY;
    }
    e.preventDefault();
    goToNextRow(rowIndex);
    return SUBMIT_STATUS.INCORRECT;
  }

  const handleEndState = (status) => {
    setGameStatus(status)
  }

  const goToNextRow = (rowIndex) => {
    const nextRowIndex = rowIndex + 1;
    if (nextRowIndex >= guessesCount) {
      handleEndState(GAME_STATUS.LOSE);
    } else {
      setCurrentEditableRow(nextRowIndex);
    }
  }

  useEffect(() => {
      moveToInput(currentEditableRow, 0);
  }, [currentEditableRow]);

  const onClickPlayAgain = () => {
    setGuesses(createInitialGuesses(word, guessesCount));
    setWord(getWordFromDictionary(word));
    setCurrentEditableRow(0);
    setGameStatus(GAME_STATUS.PLAYING);
  }

  return (
    <>
      <table className="margin-bottom">
        <tbody>
          {rowArray.map((row, rowIndex) => (
            <WordRow
              key={rowIndex}
              wordArray={wordArray}
              fillWordArray={guesses[rowIndex]}
              rowIndex={rowIndex}
              isEditable={gameStatus == GAME_STATUS.PLAYING && currentEditableRow == rowIndex}
              isNotYetUnlocked={rowIndex > currentEditableRow}
              onChangeLetterHandler={getOnChangeLetterHandler(rowIndex)}
              onKeyDownHandler={getOnKeyDownHandler(rowIndex)}
            />
          ))}
        </tbody>
      </table>
      {gameStatus == GAME_STATUS.PLAYING ? (
        <button
          disabled={isSubmitDisabled(currentEditableRow, word)}
          onClick={onClickSubmit(currentEditableRow)}
          className="margin-bottom"
        >
          Submit
        </button>
      ) : gameStatus == GAME_STATUS.WIN ? (
        <WinState
          onClickPlayAgain={onClickPlayAgain}
        />
      ) : (
        <LoseState
          word={word}
          onClickPlayAgain={onClickPlayAgain}
        />
      )}
      <Keyboard
        guesses={guesses}
        currentEditableRow={currentEditableRow}
      />
    </>
  );
}

export default WordTable;

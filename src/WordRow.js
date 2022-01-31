import { useState } from 'react';
import Letter, { LETTER_STATUSES } from './Letter';

import './WordRow.css';


function indicesOf(wordArray, letter) {
  let indices = []
  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i] == letter) {
      indices.push(i)
    }
  }
  return indices
}

function calculateLetterStatus(wordArray, letter, guessWordArray, i) {
  if (letter == '') {
    return LETTER_STATUSES.UNFILLED;
  }
  const correctIndices = indicesOf(wordArray, letter);
  const totalLetterCount = correctIndices.length
  if (totalLetterCount === 0) {
    return LETTER_STATUSES.WRONG_LETTER;
  }
  if (correctIndices.indexOf(i) != -1) {
    return LETTER_STATUSES.CORRECT_PLACE;
  }
  // FOXED
  // BODED
  // -+-++
  // AABBA
  // CAACA
  // -+*-+
  // CCAAA
  // --**+
  if (totalLetterCount > 0) {
    // AABBBBA
    // CCAAAAC
    // --***--
    // [2, 3, 4, 5]
    // AABBBBAA
    // CCAAAAAC
    // --***-+-
    // nonGuessedCorrectIndices = [0, 1, 7]
    // nonCorrectGuessIndices = [2, 3, 4, 5]
    const guessIndices = indicesOf(guessWordArray, letter)
    const nonCorrectGuessIndices = guessIndices.filter(index => wordArray[index] != letter);
    const nonGuessedCorrectIndices = correctIndices.filter(index => guessWordArray[index] != letter);
    const guessIndex = nonCorrectGuessIndices.indexOf(i);
    if (guessIndex >= nonGuessedCorrectIndices.length) {
      return LETTER_STATUSES.WRONG_LETTER;
    }
    return LETTER_STATUSES.WRONG_PLACE;
  }
}

function calculateLetterStatuses(wordArray, fillWordArray, isNotYetUnlocked) {
  const wordArrayUpper = wordArray.map(letter => letter.toUpperCase());
  if (isNotYetUnlocked) {
    return wordArrayUpper.map(letter => LETTER_STATUSES.UNFILLED);
  }
  return wordArrayUpper.map((letter, i) => calculateLetterStatus(wordArrayUpper, fillWordArray[i], fillWordArray, i));
}

function getCssString(letterStatus, isEditable) {
  let cssString = "word-data";
  if (isEditable) {
    cssString += " word-data-editable"
    return cssString;
  }
  switch(letterStatus) {
    case LETTER_STATUSES.UNFILLED:
      cssString += " word-data-unfilled"
      break;
    case LETTER_STATUSES.WRONG_LETTER:
      cssString += " word-data-wrong-letter"
      break;
    case LETTER_STATUSES.WRONG_PLACE:
      cssString += " word-data-wrong-place"
      break;
    case LETTER_STATUSES.CORRECT_PLACE:
      cssString += " word-data-correct-place"
      break;
    default:
      break;
  }
  return cssString;
}

function WordRow({
  wordArray,
  fillWordArray,
  rowIndex,
  isEditable,
  isNotYetUnlocked,
  onChangeLetterHandler,
  onKeyDownHandler,
}) {
  const letterStatuses = calculateLetterStatuses(wordArray, fillWordArray, isNotYetUnlocked);
  if (!isNotYetUnlocked && !isEditable) {
    console.log(rowIndex, wordArray, fillWordArray, letterStatuses)
  }
  return (
    <tr>
      {wordArray.map((_, i) => {
        const cssString = getCssString(letterStatuses[i], isEditable)
        return (
          <td className={cssString} key={i}>
            <Letter
              value={fillWordArray[i] || ''}
              name={`input-${rowIndex}-${i}`}
              isLocked={!isEditable}
              onChangeLetter={onChangeLetterHandler(i)}
              onKeyDown={onKeyDownHandler(i)}
            />
          </td>
        )
      })}
    </tr>
  )
}

export default WordRow;

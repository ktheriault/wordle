import guessWords from './guessWords';
import legalWords from './legalWords';
import extraWords from './extraWords';

export function getWordFromDictionary(notThisWord) {
  let guessWordsCount = guessWords.length;
  let index = Math.floor(Math.random() * guessWordsCount);
  let word = guessWords[index]
  if (word === notThisWord) {
    if (index != 0) {
      index -= 1
      word = guessWords[index]
    } else if (index < guessWordsCount - 1) {
      index += 1
      word = guessWords[index]
    }
  }
  return word;
}

export function isInDictionary(word) {
  return legalWords[word] || extraWords[word];
}

const stupidWords = [
  'ARECA',
  'ZINKY',
]

export function getStupidWord() {
  let index = Math.floor(Math.random() * stupidWords.length);
  return stupidWords[index];
}

export default { getWordFromDictionary }

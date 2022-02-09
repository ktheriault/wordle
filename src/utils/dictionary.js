import guessWords from './guessWords';
import legalWords from './legalWords';
import extraWords from './extraWords';

export function getWordFromDictionary(notThisWord) {
  let guessWordsCount = guessWords.length;
  console.log(guessWordsCount);
  let index = Math.floor(Math.random() * guessWordsCount);
  console.log(index);
  let word = guessWords[index]
  console.log(word);
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

export default { getWordFromDictionary }

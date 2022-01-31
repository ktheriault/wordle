import './Keyboard.css';

const keyboardRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

function createEmptyKeyboardDict() {
  const emptyKeyboardDict = {}
  for (let i = 0; i < keyboardRows.length; i++) {
    const row = keyboardRows[i];
    for (let j = 0; j < row.length; j++) {
      const letter = keyboardRows[i][j];
      emptyKeyboardDict[letter] = false;
    }
  }
  return emptyKeyboardDict;
}

function createUsedLetterDictFromGuesses(guesses, currentEditableRow) {
  const keyboardDict = createEmptyKeyboardDict();
  guesses.forEach((row, rowIndex) => {
    if (rowIndex < currentEditableRow) {
      row.forEach(letter => {
        keyboardDict[letter] = true;
      })
    }
  });
  return keyboardDict;
}

function Keyboard({
  guesses,
  currentEditableRow,
}) {
  const usedLetterDict = createUsedLetterDictFromGuesses(guesses, currentEditableRow)
  return (
    <div className="keyboard-container">
      {keyboardRows.map((row, i) => (
        <div className="keyboard-row" key={i}>
          {Array.prototype.map.call(row, letter => (
            <div
              key={letter}
              className={usedLetterDict[letter] ? "keyboard-key keyboard-key-used" : "keyboard-key"}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard;

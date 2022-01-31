import { useState } from 'react';
import './EndState.css'

function LoseState({
  word,
  onClickPlayAgain,
}) {
  const [shouldShowWord, setShouldShowWord] = useState(false);

  const onClickShowWord = () => {
    setShouldShowWord(prevShouldShowWord => !prevShouldShowWord);
  }

  return (
    <div className="end-container">
      <div>You lose :(</div>
      {shouldShowWord ? (
        <div className="lose-word">
          <b>
            {word}
          </b>
        </div>
      ) : (
        <button
          onClick={onClickShowWord}
        >
          Show word
        </button>
      )}
        <button
          onClick={onClickPlayAgain}
        >
          Play again!
        </button>
    </div>
  )
}

export default LoseState;

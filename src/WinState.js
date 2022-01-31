import './EndState.css'

function WinState({
  onClickPlayAgain,
}) {
  return (
    <div className="end-container">
      <div><b>YOU WIN!!!</b></div>
      <button
        onClick={onClickPlayAgain}
      >
        Play again!
      </button>
    </div>
  )
}

export default WinState;

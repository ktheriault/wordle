const LETTER_STATUSES = {
  UNFILLED: 'UNFILLED',
  WRONG_LETTER: 'WRONG_LETTER',
  CORRECT_PLACE: 'CORRECT_PLACE',
  WRONG_PLACE: 'WRONG_PLACE',
}

function Letter({
  value,
  name,
  isLocked,
  onChangeLetter,
  onKeyDown,
  onClick,
}) {
  return (
    <input
      value={value}
      maxLength={1}
      onKeyDown={onKeyDown}
      onChange={onChangeLetter}
      onClick={onClick}
      readOnly={isLocked}
      name={name}
      autoFocus={false}
      onSubmit={(e) => e.preventDefault()}
    />
  );
}

export default Letter;
export {LETTER_STATUSES};

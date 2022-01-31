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
}) {
  return (
    <input
      value={value}
      maxLength={1}
      onKeyDown={onKeyDown}
      onChange={onChangeLetter}
      readOnly={isLocked}
      name={name}
    />
  );
}

export default Letter;
export {LETTER_STATUSES};

import { useState } from 'react';
import WordTable from './WordTable';

import './App.css';

function App() {
  const [guessesCount, setGuessesCount] = useState(6);
  
  return (
    <div className="container">
      <div className="title-container">
        <div className="title">
          WORDLE
        </div>
        <div className="subtitle">
          But you can play more than once a day!
        </div>
      </div>
      <WordTable />
    </div>
  );
}

export default App;
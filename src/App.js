import { useState } from 'react';
import WordTable from './WordTable';
import { getStupidWord } from './utils/dictionary';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyAVBcJNXSZaNaImY1I_08ZUbDRPUuyu55w",
  authDomain: "wordle-676a6.firebaseapp.com",
  projectId: "wordle-676a6",
  storageBucket: "wordle-676a6.appspot.com",
  messagingSenderId: "173460373051",
  appId: "1:173460373051:web:902dc56540a0b23e9f661e",
  measurementId: "G-EFZSQ2YCX3"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics();

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
        <div className="subsubtitle">
          And it doesn't have obscure words like {getStupidWord()}
        </div>
      </div>
      <WordTable />
    </div>
  );
}

export default App;
